import {Editor, Transforms} from 'slate';

import {StencylEditor} from '../../types';
import {preBlockOps} from '../common/commands';

export function insertBulletedListBlock(editor: StencylEditor) {
	preBlockOps(editor);

	Editor.withoutNormalizing(editor, () => {
		// Transforms.setNodes(editor, {
		// 	type: 'list-item-container',
		// });

		// const nodes = Array.from(
		// 	Editor.nodes(editor, {
		// 		match: (o) => Element.isElement(o) && o.type === 'list-item-container',
		// 	}),
		// );

		// const items: Array<any> = nodes.map(([o]) => ({
		// 	type: 'list-item',
		// 	children: [o],
		// }));

		// Transforms.removeNodes(editor);

		// Transforms.insertNodes(
		// 	editor,
		// 	{
		// 		type: 'bulleted-list',
		// 		children: items,
		// 	},
		// 	{select: true},
		// );

		Transforms.setNodes(editor, {
			type: 'list-item',
		});

		Transforms.wrapNodes(editor, {
			type: 'bulleted-list',
			children: [],
		});
	});
}

export function insertNumberedListBlock(editor: StencylEditor) {
	preBlockOps(editor);

	Editor.withoutNormalizing(editor, () => {
		Transforms.setNodes(editor, {
			type: 'list-item',
		});

		Transforms.wrapNodes(editor, {
			type: 'numbered-list',
			children: [],
		});
	});
}

export function removeListBlock() {}

export function increaseListNesting() {}

export function decreaseListNesting() {}
