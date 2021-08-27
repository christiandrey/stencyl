import {Descendant, Editor, Element, Node, NodeEntry, NodeMatch, Text} from 'slate';
import {EditableElement, StencylEditor, StencylElementTypes, StencylMarks} from '../../types';

export const EMPTY_TEXT_NODE = [{text: ''}];

function getLastChild(node: Descendant, level: number): Descendant {
	if (!(level + 1) || !(Editor.isEditor(node) || Element.isElement(node))) {
		return node;
	}

	const {children} = node;

	const lastNode = children[children.length - 1];

	return getLastChild(lastNode, level - 1);
}

export function getLastNode(
	editor: StencylEditor,
	level: number,
): NodeEntry<Descendant> | undefined {
	const {children} = editor;
	const lastNode = children[children.length - 1];

	if (!lastNode) {
		return undefined;
	}

	const [, lastPath] = Editor.last(editor, []);

	return [getLastChild(lastNode, level - 1), lastPath.slice(0, level + 1)];
}

export function getCurrentBlock(editor: StencylEditor, mode: 'highest' | 'lowest' = 'highest') {
	const {selection} = editor;

	if (!selection) {
		return null;
	}

	if (mode === 'highest') {
		return Editor.node(editor, selection, {depth: 1});
	}

	const [match] = Editor.nodes(editor, {
		match: (node) => Element.isElement(node) && !editor.isInline(node),
		mode: 'lowest',
	});

	return match;
}

export function getSelectionBlocks(editor: StencylEditor) {
	const matches = getMatchingNodes(
		editor,
		(node) => Element.isElement(node) && !editor.isInline(node),
	);

	return Array.from(matches);
}

export function getSelectionMarks(editor: StencylEditor) {
	const marks = Editor.marks(editor) ?? {};

	if (marks.condition) {
		return marks;
	}

	const [match] = Editor.nodes<EditableElement>(editor, {
		match: (node) =>
			Element.isElement(node) &&
			editor.isVoid(node) &&
			node.type === 'editable' &&
			!!node.condition,
	});

	marks.condition = match?.[0].condition;

	return marks;
}

export function isBlockActive(editor: StencylEditor, type: StencylElementTypes) {
	const matches = getMatchingNodes(
		editor,
		(node) => Element.isElement(node) && !editor.isInline(node) && node.type === type,
	);

	return !!Array.from(matches).length;
}

export function isMarkActive(
	editor: StencylEditor,
	mark: keyof Omit<Text, 'text'>,
	marks?: StencylMarks,
) {
	marks = marks ?? getSelectionMarks(editor);
	return !!marks[mark];
}

export function getMatchingNodes<T extends Node>(editor: StencylEditor, query: NodeMatch<T>) {
	return Editor.nodes(editor, {
		match: query,
	});
}

export function forEachMatchingNode<T extends Node>(
	editor: StencylEditor,
	query: NodeMatch<T>,
	callback: (match: NodeEntry<T>) => void,
) {
	const matches = getMatchingNodes(editor, query);

	for (const match of matches) {
		callback(match);
	}
}

export function matchEditableNode(editor: StencylEditor) {
	return (node: Node) => Element.isElement(node) && editor.isVoid(node) && node.type === 'editable';
}
