import {StencylEditor} from '../../types';

export const withEditable = (editor: StencylEditor) => {
	const {isVoid, isInline} = editor;

	editor.isInline = (element) => {
		return element.type === 'editable' && !element.isInvisible ? true : isInline(element);
	};

	editor.isVoid = (element) => {
		return element.type === 'editable' ? true : isVoid(element);
	};

	return editor;
};
