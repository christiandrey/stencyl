import {BulletedListElement, NumberedListElement, StencylEditor} from '../../types';
import {Editor, Element} from 'slate';

export function getListEntries(editor: StencylEditor) {
	const [listItemEntry] = Editor.nodes(editor, {
		match: (o) => Element.isElement(o) && o.type === 'list-item',
		mode: 'lowest',
	});

	const [listEntry] = Editor.nodes(editor, {
		match: (o) =>
			Element.isElement(o) && (o.type === 'bulleted-list' || o.type === 'numbered-list'),
		mode: 'lowest',
	});

	return {
		listEntry,
		listItemEntry,
	};
}

export function getCurrentListBlock(editor: StencylEditor) {
	const [match] = Editor.nodes<NumberedListElement | BulletedListElement>(editor, {
		match: (node) =>
			Element.isElement(node) && ['bulleted-list', 'numbered-list'].includes(node.type),
		mode: 'lowest',
	});

	if (!match) {
		return undefined;
	}

	return match;
}
