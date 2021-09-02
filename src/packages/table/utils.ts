import {Editor, Element} from 'slate';

import {StencylEditor} from '../../types';

export function getTableEntries(editor: StencylEditor) {
	const [tableEntry, tableRowEntry, tableCellEntry] = Editor.nodes(editor, {
		match: (node) =>
			Element.isElement(node) && ['table', 'table-row', 'table-cell'].includes(node.type),
		mode: 'all',
	});

	return {tableEntry, tableRowEntry, tableCellEntry};
}
