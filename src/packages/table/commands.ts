import {Editor, Element, Path, Range, Text, Transforms} from 'slate';
import {array, lastItem} from '../../utils';
import {createTable, createTableCell, createTableRow, getTableEntries} from './utils';
import {getCurrentBlock, getNextPath, getSelectionLeaf} from '../common/utils';

import {StencylEditor} from '../../types';
import colors from '../../constants/colors';

export function insertTableBlock(editor: StencylEditor) {
	const {selection} = editor;

	if (!selection) {
		return;
	}

	let destination: Path | undefined;

	if (!Range.isCollapsed(selection)) {
		Transforms.splitNodes(editor);
	} else {
		const block = getCurrentBlock(editor, 'lowest');

		if (block) {
			const [blockNode, blockPath] = block;
			const leaf = getSelectionLeaf(editor);

			if (leaf && Text.isText(leaf[0]) && !leaf[0].text.length) {
				destination =
					Element.isElement(blockNode) && blockNode.type === 'list-item-container'
						? getNextPath(blockPath)
						: blockPath;
			} else {
				destination = getNextPath(blockPath);
			}
		}
	}

	Transforms.insertNodes(editor, createTable(), {
		at: destination,
		select: true,
	});

	const {tableEntry} = getTableEntries(editor);
	const firstPoint = Editor.start(editor, tableEntry[1]);

	Transforms.setSelection(editor, {
		anchor: firstPoint,
		focus: firstPoint,
	});
}

export function removeTableBlock(editor: StencylEditor) {
	const {tableEntry} = getTableEntries(editor);

	if (tableEntry) {
		Transforms.removeNodes(editor, {at: tableEntry[1], hanging: true});
	}
}

export function insertTableRowAbove(editor: StencylEditor) {
	const {tableRowEntry} = getTableEntries(editor);

	if (!tableRowEntry) {
		return;
	}

	const [tableRowNode, tableRowPath] = tableRowEntry;
	const colCount = Element.isElement(tableRowNode) ? tableRowNode.children.length : 1;

	Transforms.insertNodes(editor, createTableRow(colCount), {
		at: tableRowPath,
	});
}

export function insertTableRowBelow(editor: StencylEditor) {
	const {tableRowEntry} = getTableEntries(editor);

	if (!tableRowEntry) {
		return;
	}

	const [tableRowNode, tableRowPath] = tableRowEntry;
	const colCount = Element.isElement(tableRowNode) ? tableRowNode.children.length : 1;

	Transforms.insertNodes(editor, createTableRow(colCount), {
		at: getNextPath(tableRowPath),
	});
}

export function removeTableRow(editor: StencylEditor) {
	const {tableEntry, tableRowEntry} = getTableEntries(editor);

	if (!tableEntry || !tableRowEntry) {
		return;
	}

	const [tableNode] = tableEntry;
	const [, tableRowPath] = tableRowEntry;
	const rowCount = Element.isElement(tableNode) ? tableNode.children.length : 1;

	if (rowCount <= 1) {
		return;
	}

	Transforms.removeNodes(editor, {
		at: tableRowPath,
		hanging: true,
	});
}

export function insertTableColumnLeft(editor: StencylEditor) {
	const {tableEntry, tableCellEntry} = getTableEntries(editor);

	if (!tableEntry || !tableCellEntry) {
		return;
	}

	const [tableNode, tablePath] = tableEntry;
	const [, tableCellPath] = tableCellEntry;
	const rowCount = Element.isElement(tableNode) ? tableNode.children.length : 1;
	const colPos = tableCellPath.slice(-1)[0];
	const cellToCreate = createTableCell();

	array(rowCount).forEach((o) => {
		Transforms.insertNodes(editor, cellToCreate, {
			at: [...tablePath, o, colPos],
			hanging: true,
		});
	});
}

export function insertTableColumnRight(editor: StencylEditor) {
	const {tableEntry, tableCellEntry} = getTableEntries(editor);

	if (!tableEntry || !tableCellEntry) {
		return;
	}

	const [tableNode, tablePath] = tableEntry;
	const [, tableCellPath] = tableCellEntry;
	const rowCount = Element.isElement(tableNode) ? tableNode.children.length : 1;
	const colPos = tableCellPath.slice(-1)[0];
	const cellToCreate = createTableCell();

	array(rowCount).forEach((o) => {
		Transforms.insertNodes(editor, cellToCreate, {
			at: [...tablePath, o, colPos + 1],
			hanging: true,
		});
	});
}

export function removeTableColumn(editor: StencylEditor) {
	const {tableEntry, tableRowEntry, tableCellEntry} = getTableEntries(editor);

	if (!tableEntry || !tableRowEntry || !tableCellEntry) {
		return;
	}

	const [, tablePath] = tableEntry;
	const [tableRowNode] = tableRowEntry;
	const [, tableCellPath] = tableCellEntry;
	const colCount = Element.isElement(tableRowNode) ? tableRowNode.children.length : 1;
	const colPos = tableCellPath.slice(-1)[0];

	if (colCount <= 1) {
		return;
	}

	Transforms.removeNodes(editor, {
		at: tablePath,
		hanging: true,
		match: (node, path) =>
			Element.isElement(node) &&
			node.type === 'table-cell' &&
			path.length === tableCellPath.length &&
			lastItem(path) === colPos,
	});
}

export function showTableBorders(editor: StencylEditor) {
	const {tableEntry} = getTableEntries(editor);
	const [tableNode, tablePath] = tableEntry;

	if (!Element.isElement(tableNode)) {
		return;
	}

	Editor.withoutNormalizing(editor, () => {
		for (let i = 0; i < tableNode.children.length; i++) {
			Transforms.setNodes(
				editor,
				{
					borderColor: undefined,
				},
				{
					at: [...tablePath, i],
					match: (node) => Element.isElement(node) && node.type === 'table-cell',
					mode: 'all',
				},
			);
		}
	});
}

export function hideTableBorders(editor: StencylEditor) {
	const {tableEntry} = getTableEntries(editor);
	const [tableNode, tablePath] = tableEntry;

	if (!Element.isElement(tableNode)) {
		return;
	}

	Editor.withoutNormalizing(editor, () => {
		for (let i = 0; i < tableNode.children.length; i++) {
			Transforms.setNodes(
				editor,
				{
					borderColor: colors.transparent,
				},
				{
					at: [...tablePath, i],
					match: (node) => Element.isElement(node) && node.type === 'table-cell',
					mode: 'all',
				},
			);
		}
	});
}

export function tabToNextCell(editor: StencylEditor) {
	const {tableCellEntry} = getTableEntries(editor);

	if (!tableCellEntry) {
		return;
	}

	const nextTableCellEntry = Editor.next(editor, {
		match: (node, path) =>
			Element.isElement(node) &&
			node.type === 'table-cell' &&
			!Path.equals(path, tableCellEntry[1]) &&
			path.length === tableCellEntry[1].length,
	});

	if (!nextTableCellEntry) {
		return;
	}

	const edges = Editor.edges(editor, nextTableCellEntry[1]);

	Transforms.setSelection(editor, {
		anchor: edges[0],
		focus: edges[1],
	});
}

export function tabToPreviousCell(editor: StencylEditor) {
	const {tableCellEntry} = getTableEntries(editor);

	if (!tableCellEntry) {
		return;
	}

	const previousTableCellEntry = Editor.previous(editor, {
		match: (node, path) =>
			Element.isElement(node) &&
			node.type === 'table-cell' &&
			!Path.equals(path, tableCellEntry[1]) &&
			path.length === tableCellEntry[1].length,
	});

	if (!previousTableCellEntry) {
		return;
	}

	const edges = Editor.edges(editor, previousTableCellEntry[1]);

	Transforms.setSelection(editor, {
		anchor: edges[0],
		focus: edges[1],
	});
}
