import {StencylEditor} from '../../types';

export const withImage = (editor: StencylEditor) => {
	const {isVoid, isInline} = editor;

	editor.isInline = (element) => {
		return element.type === 'image' ? true : isInline(element);
	};

	editor.isVoid = (element) => {
		return element.type === 'image' ? true : isVoid(element);
	};

	return editor;
};
