import {Editor, Element} from 'slate';
import {LinkElement, StencylEditor} from '../..';

export function getCurrentInlineLink(editor: StencylEditor) {
	const [match] = Editor.nodes<LinkElement>(editor, {
		match: (node) => Element.isElement(node) && node.type === 'link',
		mode: 'lowest',
	});

	if (!match) {
		return undefined;
	}

	return match;
}
