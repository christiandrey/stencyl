import {Editor, Element, Path, Range, Transforms} from 'slate';
import {
	getLastChildEntry,
	getNextPath,
	getNodeAt,
	getPreviousPath,
	isBlockActive,
} from '../common/utils';

import {StencylEditor} from '../../types';
import {clamp} from '../../utils';
import {getListEntries} from './utils';
import {preBlockOps} from '../common/commands';

export function insertBulletedListBlock(editor: StencylEditor) {
	if (!editor.selection) {
		return;
	}

	if (isBlockActive(editor, 'list-item')) {
		removeListItemBlock(editor);
	} else {
		preBlockOps(editor);
	}

	Editor.withoutNormalizing(editor, () => {
		// Transforms.setNodes(editor, {
		// 	type: 'list-item-container',
		// });

		// const nodes = Array.from(
		// 	Editor.nodes(editor, {
		// 		match: (o) => Element.isElement(o) && o.type === 'list-item-container',
		// 	}),
		// );

		// const items: Array<any> = nodes.map(([o]) => ({
		// 	type: 'list-item',
		// 	children: [o],
		// }));

		// Transforms.removeNodes(editor);

		// Transforms.insertNodes(
		// 	editor,
		// 	{
		// 		type: 'bulleted-list',
		// 		children: items,
		// 	},
		// 	{select: true},
		// );

		Transforms.setNodes(editor, {
			type: 'list-item',
		});

		Transforms.wrapNodes(editor, {
			type: 'bulleted-list',
			children: [],
		});
	});
}

export function insertNumberedListBlock(editor: StencylEditor) {
	if (!editor.selection) {
		return;
	}

	if (isBlockActive(editor, 'list-item')) {
		removeListItemBlock(editor);
	} else {
		preBlockOps(editor);
	}

	Editor.withoutNormalizing(editor, () => {
		Transforms.setNodes(editor, {
			type: 'list-item',
		});

		Transforms.wrapNodes(editor, {
			type: 'numbered-list',
			children: [],
		});
	});
}

export function removeListItemBlock(editor: StencylEditor) {
	if (!editor.selection) {
		return;
	}

	const {listEntry, listItemEntry} = getListEntries(editor);

	if (!listEntry) {
		return;
	}

	const [, listPath] = listEntry;
	const [, listItemPath] = listItemEntry;
	const ancestorListItemEntry = Editor.parent(editor, listItemPath, {
		depth: clamp(listItemPath.length - 1, 0, Infinity),
	});
	const isNested =
		Element.isElement(ancestorListItemEntry[0]) && ancestorListItemEntry[0].type === 'list-item';

	if (isNested) {
		Transforms.moveNodes(editor, {
			at: listItemPath,
			to: Path.next(ancestorListItemEntry[1]),
		});
	} else {
		Editor.withoutNormalizing(editor, () => {
			Transforms.unwrapNodes(editor, {
				split: true,
			});

			Transforms.moveNodes(editor, {
				to: Path.next(listPath),
			});
			Transforms.setNodes(
				editor,
				{
					type: 'paragraph',
				},
				{
					hanging: true,
				},
			);
		});
	}
}

export function increaseListNesting(editor: StencylEditor) {
	/**
	 * Get previous list item in same level
	 * If no previous list item, do nothing.
	 * If previous list item exists, get last node in it
	 * If last node is a list, move current list item into list in last node from above
	 * If not, wrap list item with a list of type of parent list and move into previous list item
	 */

	const {listEntry, listItemEntry} = getListEntries(editor);

	if (!listEntry) {
		return;
	}

	const [, listItemPath] = listItemEntry;
	const previousListItemPath = getPreviousPath(listItemPath, 1);
	const previousListItemEntry = getNodeAt(editor, previousListItemPath);

	if (!previousListItemEntry) {
		return;
	}

	const lastNodeEntry = getLastChildEntry(previousListItemEntry);

	if (!lastNodeEntry) {
		return;
	}

	const [lastNode, lastNodePath] = lastNodeEntry;

	if (!Element.isElement(lastNode)) {
		return;
	}

	Editor.withoutNormalizing(editor, () => {
		if (lastNode.type === 'bulleted-list' || lastNode.type === 'numbered-list') {
			const destinationEntry = getLastChildEntry(lastNodeEntry);

			if (destinationEntry) {
				Transforms.moveNodes(editor, {
					match: (o) => Element.isElement(o) && o.type === 'list-item',
					to: getNextPath(destinationEntry[1]),
				});
			}
		} else {
			Transforms.wrapNodes(
				editor,
				{
					type: (listEntry[0] as any).type,
					children: [],
				},
				{
					match: (o) => Element.isElement(o) && o.type === 'list-item',
				},
			);

			Transforms.moveNodes(editor, {
				match: (o) => Element.isElement(o) && ['bulleted-list', 'numbered-list'].includes(o.type),
				to: getNextPath(lastNodePath),
			});
		}
	});
}

export function decreaseListNesting(editor: StencylEditor) {
	const {listEntry, listItemEntry} = getListEntries(editor);

	if (!listEntry) {
		return;
	}

	const [listNode, listPath] = listEntry;
	const [, listItemPath] = listItemEntry;
	const [ancestorListItemNode, ancestorListItemPath] = Editor.parent(editor, listItemPath, {
		depth: clamp(listItemPath.length - 1, 0, Infinity),
	});
	const [, lastPath] = Editor.last(editor, listPath);
	const nextItem = getNodeAt(editor, Path.next(listItemPath));
	const lastItem = getNodeAt(editor, lastPath.slice(0, listItemPath.length));

	if (nextItem && lastItem) {
		const range: Range = {
			anchor: Editor.point(editor, nextItem[1], {edge: 'start'}),
			focus: Editor.point(editor, lastItem[1], {edge: 'end'}),
		};

		Editor.withoutNormalizing(editor, () => {
			Transforms.wrapNodes(
				editor,
				{
					type: Element.isElement(listNode) ? (listNode.type as any) : 'bulleted-list',
					children: [],
				},
				{at: range},
			);

			Transforms.moveNodes(editor, {
				at: Path.next(listItemPath),
				to: [...listItemPath, 1],
			});
		});
	}

	if (Editor.isEditor(ancestorListItemNode)) {
		Editor.withoutNormalizing(editor, () => {
			Transforms.unwrapNodes(editor, {
				split: true,
			});

			Transforms.moveNodes(editor, {
				to: Path.next(listPath),
			});
			Transforms.setNodes(
				editor,
				{
					type: 'paragraph',
				},
				{
					hanging: true,
				},
			);
		});
	} else {
		Transforms.moveNodes(editor, {
			at: listItemPath,
			to: Path.next(ancestorListItemPath),
		});
	}
}
