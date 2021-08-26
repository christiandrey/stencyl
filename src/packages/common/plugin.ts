import {EMPTY_TEXT_NODE, getLastNode} from './utils';
import {Element, Path, Transforms} from 'slate';

import {StencylEditor} from '../../types';

export const withTrailingBlock = (editor: StencylEditor) => {
	const {normalizeNode} = editor;

	editor.normalizeNode = ([currentNode, currentPath]) => {
		if (!currentPath.length) {
			const lastChild = getLastNode(editor, 0);

			const lastChildNode = lastChild?.[0];

			if (
				!lastChildNode ||
				(Element.isElement(lastChildNode) && lastChildNode.type !== 'paragraph')
			) {
				const at = lastChild ? Path.next(lastChild[1]) : [0];

				Transforms.insertNodes(
					editor,
					{
						type: 'paragraph',
						children: EMPTY_TEXT_NODE,
					},
					{at},
				);
				return;
			}
		}

		return normalizeNode([currentNode, currentPath]);
	};

	return editor;
};
