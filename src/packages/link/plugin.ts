import {StencylEditor, StencylElement} from '../../types';

export const withLink = (editor: StencylEditor) => {
	const {isInline} = editor;

	editor.isInline = (element: StencylElement) => {
		return element.type === 'link' ? true : isInline(element);
	};

	return editor;
};
