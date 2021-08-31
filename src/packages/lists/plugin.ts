import {
	Descendant,
	Editor,
	Element,
	Location,
	Node,
	NodeEntry,
	NodeMatch,
	Path,
	Range,
	Text,
	Transforms,
} from 'slate';
import {
	EMPTY_TEXT_NODE,
	getCurrentBlock,
	getParentNode,
	getSelectionLeaf,
	moveCaretTo,
} from '../common/utils';
import {ListItemElement, StencylEditor} from '../../types';

import {lastItem} from '../../utils';

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
						breakOutOfList(editor);
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
		at = end;
	}

	const [listItemEntry] = Editor.nodes(editor, {
		match: (o) => Element.isElement(o) && o.type === 'list-item',
		mode: 'lowest',
	});

	const [, path] = listItemEntry;
	const isStart = Editor.isStart(editor, at, path);
	const isEnd = Editor.isEnd(editor, at, path);

	if (isStart) {
		Transforms.insertNodes(
			editor,
			{
				type: 'list-item',
				children: [
					{
						type: 'list-item-container',
						children: EMPTY_TEXT_NODE,
					},
				],
			},
			{
				at: path,
			},
		);
		return;
	}

	if (isEnd) {
		if (!Range.isCollapsed(editor.selection)) {
			Transforms.delete(editor);
		}

		Transforms.insertNodes(
			editor,
			{
				type: 'list-item',
				children: [
					{
						type: 'list-item-container',
						children: EMPTY_TEXT_NODE,
					},
				],
			},
			{
				at: Path.next(path),
				select: true,
			},
		);
	}

	if (!isStart && !isEnd) {
		const leafEntry = getSelectionLeaf(editor);

		if (leafEntry) {
			Transforms.insertNodes(
				editor,
				{
					type: 'list-item',
					children: [
						{
							type: 'list-item-container',
							children: [leafEntry[0] ?? {text: ''}],
						},
					],
				},
				{
					at: path,
				},
			);

			Transforms.delete(editor, {at: leafEntry[1] ?? at});

			moveCaretTo(editor, leafEntry[1]);
		}
	}
}

function breakOutOfList(editor: StencylEditor) {
	const [listItemEntry] = Editor.nodes(editor, {
		match: (o) => Element.isElement(o) && o.type === 'list-item',
		mode: 'lowest',
	});
	const listItemsAfter = getListItemsAfter(editor, listItemEntry);
	const isNested = getIsInNestedList(editor);

	const [listEntry] = Editor.nodes(editor, {
		match: (o) =>
			Element.isElement(o) && (o.type === 'bulleted-list' || o.type === 'numbered-list'),
		mode: 'lowest',
	});

	const [listNode, listPath] = listEntry;

	if (isNested) {
		const [ancestorListItemEntry] = Editor.nodes(editor, {
			at: listPath.slice(0, listPath.length - 1),
			match: (o) => Element.isElement(o) && o.type === 'list-item',
		});
		const [, ancestorListItemPath] = ancestorListItemEntry;
		const children: Array<Descendant> = [
			{
				type: 'list-item-container',
				children: EMPTY_TEXT_NODE,
			},
		];

		if (listItemsAfter.length) {
			children.push({
				type: Element.isElement(listNode) ? (listNode.type as any) : 'bulleted-list',
				children: [],
			});
		}

		Transforms.insertNodes(
			editor,
			{
				type: 'list-item',
				children,
			},
			{
				at: Path.next(ancestorListItemPath),
			},
		);

		if (listItemsAfter.length) {
			Transforms.moveNodes(editor, {
				to: [...Path.next(ancestorListItemPath), 1, 0],
				at: listPath,
				match: listItemsAfterMatcher(listItemEntry),
			});
		}

		Transforms.removeNodes(editor, {
			at: listItemEntry[1],
		});

		moveCaretTo(editor, [...Path.next(ancestorListItemPath), 0]);
	} else {
		if (listItemsAfter.length) {
			Transforms.insertNodes(
				editor,
				{
					type: Element.isElement(listNode) ? (listNode.type as any) : 'bulleted-list',
					children: [],
				},
				{
					at: Path.next(listPath),
				},
			);
			Transforms.moveNodes(editor, {
				to: [...Path.next(listPath), 0],
				at: listPath,
				match: listItemsAfterMatcher(listItemEntry),
			});
		}

		Transforms.removeNodes(editor, {
			at: listItemEntry[1],
		});
		Transforms.insertNodes(
			editor,
			{
				type: 'paragraph',
				children: EMPTY_TEXT_NODE,
			},
			{
				at: Path.next(listPath),
			},
		);
		moveCaretTo(editor, Path.next(listPath));
	}
}

function getIsInNestedList(editor: StencylEditor) {
	const matches = Editor.nodes(editor, {
		match: (node) =>
			Element.isElement(node) && (node.type === 'bulleted-list' || node.type === 'numbered-list'),
	});

	return Array.from(matches).length > 1;
}

const listItemsAfterMatcher: (entry: NodeEntry) => NodeMatch<ListItemElement> = (
	entry: NodeEntry,
) => {
	return (node, path) =>
		Element.isElement(node) &&
		node.type === 'list-item' &&
		path.length === entry[1].length &&
		lastItem(path) > lastItem(entry[1]);
};

function getListItemsAfter(editor: StencylEditor, entry: NodeEntry) {
	const parent = getParentNode(editor, entry);

	if (!parent) {
		return [];
	}

	const matches = Editor.nodes(editor, {
		at: parent[1],
		match: listItemsAfterMatcher(entry),
	});

	return Array.from(matches);
}
