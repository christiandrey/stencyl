import {Editor, Element, NodeEntry, Range, Transforms} from 'slate';
import {ImageElement, StencylEditor} from '../../types';

import {getEmptyTextNode} from '../common/utils';

export type ImageInsertOptions = {
	width: number;
	height: number;
	url: string;
};

export type ImageResizeOptions = {
	entry?: NodeEntry<ImageElement>;
	width?: number;
	height?: number;
};

export function getCurrentInlineImage(editor: StencylEditor) {
	const {selection} = editor;

	if (!selection) {
		return null;
	}

	const [match] = Editor.nodes<ImageElement>(editor, {
		match: (node) => Element.isElement(node) && editor.isInline(node) && node.type === 'image',
		mode: 'lowest',
	});

	return match;
}

export function insertInlineImage(editor: StencylEditor, options: ImageInsertOptions) {
	if (!editor.selection) {
		return;
	}

	if (!Range.isCollapsed(editor.selection)) {
		Transforms.delete(editor);
	}

	Transforms.insertNodes(editor, {
		type: 'image',
		url: options.url,
		width: options.width,
		height: options.height,
		children: getEmptyTextNode(),
	});
}

export function resizeInlineImage(editor: StencylEditor, options: ImageResizeOptions = {}) {
	const currentImage = options.entry ?? getCurrentInlineImage(editor);

	if (!currentImage || (!options.width && !options.height)) {
		return;
	}

	const [, path] = currentImage;
	const {width, height} = options;

	Transforms.setNodes(
		editor,
		{
			width,
			height,
		},
		{at: path},
	);
}
