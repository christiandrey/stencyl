import {Editor, Element} from 'slate';

import {StencylEditor} from '../../types';

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
