import {StencylEditor} from '../../types';
import {insertInlineLink} from './commands';
import {isValidUrl} from '../../utils';

export const withLink = (editor: StencylEditor) => {
	const {isInline, insertText} = editor;

	editor.isInline = (element) => {
		return element.type === 'link' ? true : isInline(element);
	};

	editor.insertText = (text) => {
		isValidUrl(text) ? insertInlineLink(editor, text) : insertText(text);
	};

	return editor;
};
