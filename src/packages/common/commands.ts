import {Element, Transforms} from 'slate';
import {ParagraphElement, StencylAlignment, StencylEditor, StencylElementTypes} from '../../types';

import {clamp} from '../../utils';
import {forEachMatchingNode} from './utils';

export const WRAPPED_BLOCKS: Array<StencylElementTypes> = [
	'numbered-list',
	'bulleted-list',
	'table',
];

export const BLOCKS_WITH_ALIGNMENT: Array<StencylElementTypes> = [
	'block-quote',
	'code-block',
	'heading-one',
	'heading-two',
	'heading-three',
	'heading-four',
	'heading-five',
	'heading-six',
	'paragraph',
];

export const BLOCKS_WITH_INDENTATION: Array<StencylElementTypes> = [
	...BLOCKS_WITH_ALIGNMENT,
	'bulleted-list',
	'numbered-list',
];

export const INDENTATION_FACTOR = 3;

export function preBlockOps(editor: StencylEditor) {
	Transforms.unwrapNodes(editor, {
		match: (node) => Element.isElement(node) && WRAPPED_BLOCKS.includes(node.type),
		split: true,
	});
}

export function activateBlock(editor: StencylEditor, type: StencylElementTypes) {
	preBlockOps(editor);

	Transforms.setNodes(editor, {
		type,
	});
}

export function deactivateBlock(editor: StencylEditor) {
	preBlockOps(editor);

	Transforms.setNodes(editor, {
		type: 'paragraph',
	});
}

export function setBlockAlignment(editor: StencylEditor, alignment?: StencylAlignment) {
	forEachMatchingNode(
		editor,
		(node) =>
			Element.isElement(node) &&
			!editor.isInline(node) &&
			BLOCKS_WITH_ALIGNMENT.includes(node.type),
		(match) => {
			const [node, path] = match;

			if (!Element.isElement(node) || !BLOCKS_WITH_ALIGNMENT.includes(node.type)) {
				return;
			}

			Transforms.setNodes(
				editor,
				{
					alignment: alignment === 'left' ? undefined : alignment,
				},
				{
					at: path,
				},
			);
		},
	);
}

export function changeBlockIndentation(editor: StencylEditor, mode: 'increment' | 'decrement') {
	forEachMatchingNode(
		editor,
		(node) =>
			Element.isElement(node) &&
			!editor.isInline(node) &&
			BLOCKS_WITH_INDENTATION.includes(node.type),
		(match) => {
			const [node, path] = match;
			const indentation = (node as ParagraphElement).indentation ?? 0;
			const eventualIndentation = clamp(
				mode === 'increment' ? indentation + INDENTATION_FACTOR : indentation - INDENTATION_FACTOR,
				0,
				99,
			);

			Transforms.setNodes(
				editor,
				{
					indentation: eventualIndentation || undefined,
				},
				{
					at: path,
				},
			);
		},
	);
}
