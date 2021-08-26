import {Descendant, Editor, Element, NodeEntry} from 'slate';

import {StencylEditor} from '../../types';

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
