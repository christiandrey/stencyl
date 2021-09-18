import {Editor, Element, Point, Range} from 'slate';

import {StencylEditor} from '../../types';

export const withTable = (editor: StencylEditor) => {
	const {deleteBackward, deleteForward} = editor;

	editor.deleteBackward = (unit) => {
		const {selection} = editor;

		if (selection && Range.isCollapsed(selection)) {
			const [tableCell] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table-cell',
			});

			if (tableCell) {
				const [, tableCellPath] = tableCell;
				const start = Editor.start(editor, tableCellPath);

				if (Point.equals(selection.anchor, start)) {
					return;
				}
			}
		}

		deleteBackward(unit);
	};

	editor.deleteForward = (unit) => {
		const {selection} = editor;

		if (selection && Range.isCollapsed(selection)) {
			const [tableCell] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table-cell',
			});

			if (tableCell) {
				const [, tableCellPath] = tableCell;
				const end = Editor.end(editor, tableCellPath);

				if (Point.equals(selection.anchor, end)) {
					return;
				}
			}
		}

		deleteForward(unit);
	};

	return editor;
};
