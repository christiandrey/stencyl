import {StencylEditor, StencylElement} from '../../types';

export const withLink = (editor: StencylEditor) => {
	editor.isInline = (element: StencylElement) =>
		element.type === 'link' ? true : editor.isInline(element);

	return editor;
};
