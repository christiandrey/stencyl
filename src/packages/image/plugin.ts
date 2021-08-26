import {StencylEditor} from '../../types';

export const withImage = (editor: StencylEditor) => {
	const {isInline} = editor;

	editor.isInline = (element) => {
		return element.type === 'image' ? true : isInline(element);
	};

	return editor;
};
