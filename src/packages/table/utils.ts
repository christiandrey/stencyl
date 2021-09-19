import {Editor, Element} from 'slate';
import {StencylEditor, TableCellElement, TableElement, TableRowElement} from '../../types';

import {array} from '../../utils';

export const DEFAULT_TABLE_CELL_WIDTH = 48;
export const DEFAULT_TABLE_CELL_HEIGHT = 48;
export const DEFAULT_TABLE_ROWS = 2;
export const DEFAULT_TABLE_COLS = 2;

export function getTableEntries(editor: StencylEditor) {
	const [tableEntry, tableRowEntry, tableCellEntry] = Editor.nodes(editor, {
		match: (node) =>
			Element.isElement(node) && ['table', 'table-row', 'table-cell'].includes(node.type),
		mode: 'all',
	});

	return {tableEntry, tableRowEntry, tableCellEntry};
}

export function createTableCell(
	width = DEFAULT_TABLE_CELL_WIDTH,
	height = DEFAULT_TABLE_CELL_HEIGHT,
): TableCellElement {
	return {
		type: 'table-cell',
		children: [{type: 'paragraph', children: [{text: ''}]}],
		width,
		height,
	};
}

export function createTableRow(columns = DEFAULT_TABLE_COLS): TableRowElement {
	return {
		type: 'table-row',
		children: array(columns).map(() => createTableCell()),
	};
}

export function createTable(rows = DEFAULT_TABLE_ROWS, columns = DEFAULT_TABLE_COLS): TableElement {
	return {
		type: 'table',
		children: array(rows).map(() => createTableRow(columns)),
	};
}
