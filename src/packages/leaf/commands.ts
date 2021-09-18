import {StencylDisplayCondition, StencylEditor, StencylMarks} from '../../types';
import {activateMark, deactivateMark} from '../common/commands';

import {isMarkActive} from '../common/utils';

export function setColorMark(editor: StencylEditor, value: string) {
	activateMark(editor, 'color', value);
}

export function unsetColorMark(editor: StencylEditor) {
	deactivateMark(editor, 'color');
}

export function toggleBoldMark(editor: StencylEditor, marks?: StencylMarks) {
	isMarkActive(editor, 'bold', marks)
		? deactivateMark(editor, 'bold')
		: activateMark(editor, 'bold');
}

export function toggleItalicMark(editor: StencylEditor, marks?: StencylMarks) {
	isMarkActive(editor, 'italic', marks)
		? deactivateMark(editor, 'italic')
		: activateMark(editor, 'italic');
}

export function toggleUnderlineMark(editor: StencylEditor, marks?: StencylMarks) {
	isMarkActive(editor, 'underline', marks)
		? deactivateMark(editor, 'underline')
		: activateMark(editor, 'underline');
}

export function toggleStrikethroughMark(editor: StencylEditor, marks?: StencylMarks) {
	isMarkActive(editor, 'strikethrough', marks)
		? deactivateMark(editor, 'strikethrough')
		: activateMark(editor, 'strikethrough');
}

export function toggleCodeMark(editor: StencylEditor, marks?: StencylMarks) {
	isMarkActive(editor, 'code', marks)
		? deactivateMark(editor, 'code')
		: activateMark(editor, 'code');
}

export function setConditionMark(
	editor: StencylEditor,
	value: StencylDisplayCondition | Array<StencylDisplayCondition>,
) {
	activateMark(editor, 'condition', value);
}

export function unsetConditionMark(editor: StencylEditor) {
	deactivateMark(editor, 'condition');
}
