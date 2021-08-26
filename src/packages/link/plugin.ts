import {StencylEditor} from '../../types';

export const withLink = (editor: StencylEditor) => {
	const {isInline} = editor;

	editor.isInline = (element) => {
		return element.type === 'link' ? true : isInline(element);
	};

	return editor;
};
