import {Descendant, Editor, Element, NodeEntry} from 'slate';
import {StencylEditor, StencylElementTypes} from '../../types';

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

export function isBlockActive(editor: StencylEditor, type: StencylElementTypes) {
	const currentBlock = getCurrentBlock(editor);

	if (!currentBlock) {
		return false;
	}

	const [node] = currentBlock;

	return Editor.isBlock(editor, node) && node.type === type;
}

export function isMarkActive() {}
