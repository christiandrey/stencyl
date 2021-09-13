import {
	EditableElement,
	ParagraphElement,
	StencylAlignment,
	StencylEditor,
	StencylElementTypes,
	StencylMarks,
} from '../../types';
import {Editor, Element, Transforms} from 'slate';
import {clamp, unsetProperty} from '../../utils';
import {forEachMatchingNode, isEditableElement} from './utils';

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

export function activateMark<K extends keyof StencylMarks>(
	editor: StencylEditor,
	mark: K,
	value: StencylMarks[K] = true as any,
) {
	Editor.addMark(editor, mark, value);

	const editables = Editor.nodes<EditableElement>(editor, {
		match: (node) => isEditableElement(editor, node),
		voids: true,
	});

	for (const [node, path] of editables) {
		Transforms.setNodes(
			editor,
			{
				marks: {
					...node.marks,
					[mark]: value,
				},
			},
			{
				at: path,
				hanging: true,
				voids: true,
			},
		);
	}
}

export function deactivateMark(editor: StencylEditor, mark: keyof StencylMarks) {
	Editor.removeMark(editor, mark);

	const matches = Editor.nodes<EditableElement>(editor, {
		match: (node) => isEditableElement(editor, node),
		voids: true,
	});

	for (const [node, path] of matches) {
		Transforms.setNodes(
			editor,
			{
				marks: unsetProperty(node.marks, mark),
			},
			{
				at: path,
				hanging: true,
				voids: true,
			},
		);
	}
}

export function clearMarks(editor: StencylEditor) {
	const marks: Array<keyof StencylMarks> = [
		'bold',
		'code',
		'color',
		'italic',
		'underline',
		'strikethrough',
		'condition',
	];

	marks.forEach((o) => editor.removeMark(o));

	const matches = Editor.nodes<EditableElement>(editor, {
		match: (node) => isEditableElement(editor, node),
		voids: true,
	});

	for (const [, path] of matches) {
		Transforms.setNodes(
			editor,
			{
				marks: {},
			},
			{
				at: path,
				hanging: true,
				voids: true,
			},
		);
	}
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
