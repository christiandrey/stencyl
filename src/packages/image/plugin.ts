import {StencylEditor, StencylElement} from '../../types';

export const withImage = (editor: StencylEditor) => {
	const {isInline} = editor;

	editor.isInline = (element: StencylElement) => {
		return element.type === 'image' ? true : isInline(element);
	};

	return editor;
};
