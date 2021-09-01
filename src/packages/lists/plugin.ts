import {
	Editor,
	Element,
	Location,
	Node,
	NodeEntry,
	NodeMatch,
	Range,
	Text,
	Transforms,
} from 'slate';
import {
	getCurrentBlock,
	getNextPath,
	getNodeAt,
	getParentNode,
	getSelectionLeaf,
} from '../common/utils';

import {StencylEditor} from '../../types';
import {decreaseListNesting} from './commands';
import {getListEntries} from './utils';

export const withLists = (editor: StencylEditor) => {
	const {normalizeNode, insertBreak} = editor;

	editor.normalizeNode = (entry) => {
		const [node] = entry;

		if (Element.isElement(node) && node.type === 'list-item') {
			const fixedOrphanedListItems = fixOrphanedListItems(editor, entry);

			if (fixedOrphanedListItems) {
				return;
			}

			const fixedUnwrappedListItemChildren = fixUnwrappedListItemChildren(editor, entry);

			if (fixedUnwrappedListItemChildren) {
				return;
			}
		}

		if (
			Element.isElement(node) &&
			(node.type === 'bulleted-list' || node.type === 'numbered-list')
		) {
			// const [firstListItem] = Editor.nodes(editor, {
			// 	at: path,
			// 	match: (o, p) =>
			// 		Element.isElement(o) && o.type === 'list-item' && p.length - path.length === 1,
			// });
			// if (!firstListItem) {
			// 	Transforms.removeNodes(editor, {at: path, hanging: true});
			// 	return;
			// }
			const fixedEmptyList = fixEmptyList(editor, entry);

			if (fixedEmptyList) {
				return;
			}
		}

		normalizeNode(entry);
	};

	editor.insertBreak = () => {
		const lowestBlockEntry = getCurrentBlock(editor, 'lowest');

		if (lowestBlockEntry) {
			const [node] = lowestBlockEntry;

			if (Element.isElement(node) && node.type === 'list-item-container') {
				const leafNodeEntry = getSelectionLeaf(editor);

				if (leafNodeEntry) {
					const [leafNode] = leafNodeEntry;

					if (leafNode.text.length) {
						insertNewListItem(editor);
					} else {
						decreaseListNesting(editor);
					}

					return;
				}
			}
		}

		insertBreak();
	};

	return editor;
};

function fixOrphanedListItems(editor: StencylEditor, entry: NodeEntry): boolean {
	const parent = getParentNode(editor, entry);

	if (parent) {
		const [parentNode, parentPath] = parent;

		if (
			!Element.isElement(parentNode) ||
			(parentNode.type !== 'bulleted-list' && parentNode.type !== 'numbered-list')
		) {
			Transforms.wrapNodes(
				editor,
				{
					type: 'bulleted-list',
					children: [],
				},
				{
					at: parentPath,
					match: (o) => Element.isElement(o) && o.type === 'list-item',
				},
			);

			return true;
		}
	}

	return false;
}

function fixUnwrappedListItemChildren(editor: StencylEditor, entry: NodeEntry): boolean {
	const [, path] = entry;
	const matcher: NodeMatch<Node> = (o, p) =>
		p.length === path.length + 1 &&
		(Text.isText(o) ||
			(Element.isElement(o) &&
				!['list-item-container', 'bulleted-list', 'numbered-list'].includes(o.type)));

	const matches = Editor.nodes(editor, {
		at: path,
		match: matcher,
	});

	const matchesLength = Array.from(matches).length;

	if (matchesLength) {
		Transforms.wrapNodes(
			editor,
			{
				type: 'list-item-container',
				children: [],
			},
			{
				at: path,
				match: matcher,
			},
		);
		return true;
	}

	return false;
}

function fixEmptyList(editor: StencylEditor, entry: NodeEntry): boolean {
	const [node, path] = entry;

	if (Element.isElement(node) && node.children.length === 1 && Text.isText(node.children[0])) {
		Transforms.removeNodes(editor, {
			at: path,
			hanging: true,
		});

		return true;
	}

	if (path.length === 1 && path[0] === 0) {
		const text = Editor.string(editor, path);

		if (!text.length) {
			Transforms.removeNodes(editor, {
				at: path,
				hanging: true,
			});

			return true;
		}
	}

	return false;
}

function insertNewListItem(editor: StencylEditor) {
	let at: Location;

	if (!editor.selection) {
		return;
	}

	at = editor.selection;

	if (Range.isRange(at)) {
		at = Editor.unhangRange(editor, at);
	}

	if (Range.isCollapsed(at)) {
		at = at.anchor;
	} else {
		const [, end] = Range.edges(at);
		const pointRef = Editor.pointRef(editor, end);
		Transforms.delete(editor, {at});
		at = pointRef.unref()!;
	}

	const {listItemEntry} = getListEntries(editor);

	const leafEntry = getSelectionLeaf(editor);

	if (leafEntry) {
		const [, listItemPath] = listItemEntry;

		Transforms.splitNodes(editor, {
			at,
			always: true,
		});

		Editor.withoutNormalizing(editor, () => {
			let focus = listItemPath;
			let focusNext = listItemPath;

			if (editor.selection) {
				const currentPath = editor.selection.focus.path;
				focus = currentPath.slice(0, -1);
				focusNext = getNextPath(currentPath);
			}
			Transforms.wrapNodes(editor, {
				type: 'list-item',
				children: [],
			});

			const nextNodeEntry = getNodeAt(editor, getNextPath(focus));

			if (nextNodeEntry?.length) {
				const [nextNode, nextPath] = nextNodeEntry;

				if (
					Element.isElement(nextNode) &&
					(nextNode.type === 'bulleted-list' || nextNode.type === 'numbered-list')
				) {
					Transforms.moveNodes(editor, {
						at: nextPath,
						to: focusNext,
					});
				}
			}

			Transforms.moveNodes(editor, {
				match: (node) => Element.isElement(node) && node.type === 'list-item',
				to: getNextPath(listItemPath),
			});
		});
	}
}
