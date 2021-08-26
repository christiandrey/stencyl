import {StencylAlignment, StencylEditor} from '../../types';
import {activateBlock, deactivateBlock} from '../common/commands';
import {isBlockActive, setBlockAlignment} from '../common/utils';

import {NodeEntry} from 'slate';

export function toggleHeadingOne(editor: StencylEditor) {
	isBlockActive(editor, 'heading-one')
		? deactivateBlock(editor)
		: activateBlock(editor, 'heading-one');
}

export function toggleHeadingTwo(editor: StencylEditor) {
	isBlockActive(editor, 'heading-two')
		? deactivateBlock(editor)
		: activateBlock(editor, 'heading-two');
}

export function toggleHeadingThree(editor: StencylEditor) {
	isBlockActive(editor, 'heading-three')
		? deactivateBlock(editor)
		: activateBlock(editor, 'heading-three');
}

export function toggleHeadingFour(editor: StencylEditor) {
	isBlockActive(editor, 'heading-four')
		? deactivateBlock(editor)
		: activateBlock(editor, 'heading-four');
}

export function toggleHeadingFive(editor: StencylEditor) {
	isBlockActive(editor, 'heading-five')
		? deactivateBlock(editor)
		: activateBlock(editor, 'heading-one');
}

export function toggleHeadingSix(editor: StencylEditor) {
	isBlockActive(editor, 'heading-six')
		? deactivateBlock(editor)
		: activateBlock(editor, 'heading-six');
}

export function setHeadingsAlignment(
	editor: StencylEditor,
	alignment?: StencylAlignment,
	block?: NodeEntry,
) {
	setBlockAlignment(editor, alignment, block);
}
