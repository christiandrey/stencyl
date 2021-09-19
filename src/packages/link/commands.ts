import {Editor, Element, Range, Transforms} from 'slate';

import {getEmptyTextNode} from '../common/utils';
import {isValidUrl} from '../../utils';

export function insertInlineLink(editor: Editor, url: string) {
	const {selection} = editor;

	if (!selection || !isValidUrl(url)) {
		return;
	}

	removeInlineLink(editor);

	if (Range.isCollapsed(selection)) {
		Transforms.insertNodes(editor, {
			type: 'link',
			url,
			children: [{text: url}],
		});
		return;
	}

	Transforms.wrapNodes(
		editor,
		{
			type: 'link',
			url,
			children: getEmptyTextNode(),
		},
		{split: true},
	);
	Transforms.collapse(editor, {edge: 'end'});
}

export function removeInlineLink(editor: Editor) {
	Transforms.unwrapNodes(editor, {
		match: (node) => Element.isElement(node) && node.type === 'link',
	});
}
