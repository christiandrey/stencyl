import {StencylEditor, StencylElement} from '../../types';

export const withImage = (editor: StencylEditor) => {
	editor.isInline = (element: StencylElement) =>
		element.type === 'image' ? true : editor.isInline(element);

	return editor;
};
