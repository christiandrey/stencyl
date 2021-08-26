import {Element, NodeEntry, Transforms} from 'slate';
import {StencylAlignment, StencylEditor, StencylElementTypes} from '../../types';

import {getCurrentBlock} from './utils';

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

export function preBlockOps(editor: StencylEditor) {
	const currentBlock = getCurrentBlock(editor);

	if (!currentBlock) {
		return;
	}

	const [node, path] = currentBlock;

	if (Element.isElement(node) && WRAPPED_BLOCKS.includes(node.type)) {
		Transforms.unwrapNodes(editor, {
			at: path,
			split: true,
		});
	}
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

export function setBlockAlignment(
	editor: StencylEditor,
	alignment?: StencylAlignment,
	block?: NodeEntry | null,
) {
	block = block ?? getCurrentBlock(editor);

	if (!block) {
		return;
	}

	const [node, path] = block;

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
}
