import React, {FC, MouseEvent, memo, useEffect, useState} from 'react';
import {
	hideTableBorders,
	insertTableColumnLeft,
	insertTableColumnRight,
	insertTableRowAbove,
	insertTableRowBelow,
	removeTableBlock,
	removeTableColumn,
	removeTableRow,
	showTableBorders,
} from '../../../../../packages/table/commands';

import {ReactComponent as BorderAll} from '../../../../../assets/images/icon-border-all.svg';
import {ReactComponent as BorderNone} from '../../../../../assets/images/icon-border-none.svg';
import {ReactComponent as ColumnInsertLeft} from '../../../../../assets/images/icon-column-insert-left.svg';
import {ReactComponent as ColumnInsertRight} from '../../../../../assets/images/icon-column-insert-right.svg';
import Icon from '../../icon';
import {ReactComponent as LayoutList} from '../../../../../assets/images/icon-layout-list.svg';
import {NodeEntry} from 'slate';
import {ReactComponent as RowInsertBottom} from '../../../../../assets/images/icon-row-insert-bottom.svg';
import {ReactComponent as RowInsertTop} from '../../../../../assets/images/icon-row-insert-top.svg';
import {TableElement} from '../../../../../types';
import {ReactComponent as Trash} from '../../../../../assets/images/icon-trash.svg';
import {useSlateStatic} from 'slate-react';

type TableToolsProps = {
	entry: NodeEntry<TableElement>;
};

const BaseTableTools: FC<TableToolsProps> = ({entry: [node]}) => {
	const editor = useSlateStatic();

	const [hasBorders, setHasBorders] = useState(!node.children[0]?.children[0]?.borderColor);

	useEffect(() => {
		setHasBorders(!node.children[0]?.children[0]?.borderColor);
	}, [node]);

	const handleInsertRowAbove = (e: MouseEvent) => {
		e.preventDefault();
		insertTableRowAbove(editor);
	};

	const handleInsertRowBelow = (e: MouseEvent) => {
		e.preventDefault();
		insertTableRowBelow(editor);
	};

	const handleInsertColLeft = (e: MouseEvent) => {
		e.preventDefault();
		insertTableColumnLeft(editor);
	};

	const handleInsertColRight = (e: MouseEvent) => {
		e.preventDefault();
		insertTableColumnRight(editor);
	};

	const handleRemoveRow = (e: MouseEvent) => {
		e.preventDefault();
		removeTableRow(editor);
	};

	const handleRemoveColumn = (e: MouseEvent) => {
		e.preventDefault();
		removeTableColumn(editor);
	};

	const handleToggleBorders = (e: MouseEvent) => {
		e.preventDefault();
		if (hasBorders) {
			hideTableBorders(editor);
		} else {
			showTableBorders(editor);
		}

		setHasBorders((o) => !o);
	};

	const handleRemoveTable = (e: MouseEvent) => {
		e.preventDefault();
		removeTableBlock(editor);
	};

	return (
		<div>
			<div className='st-text-headline st-text-blue-500 st-mb-8'>Table tools</div>
			<div className='st-text-gray-500 st-mb-8 st-text-subhead'>
				Use these tools to add or modify features on the table.
			</div>
			<div className='st-space-y-8'>
				<div className='st-flex st-space-x-8'>
					<div className='st-flex-1 st-space-y-8'>
						<div
							onMouseDown={handleInsertRowAbove}
							className='st-h-36 st-px-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-gray-100 st-text-gray-500 st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-gray-200'
						>
							<Icon className='st-s-16'>
								<RowInsertTop />
							</Icon>
							<div className='st-font-medium st-text-subhead'>Add row above</div>
						</div>
						<div
							onMouseDown={handleInsertColLeft}
							className='st-h-36 st-px-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-gray-100 st-text-gray-500 st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-gray-200'
						>
							<Icon className='st-s-16'>
								<ColumnInsertLeft />
							</Icon>
							<div className='st-font-medium st-text-subhead'>Add column left</div>
						</div>
						<div
							onMouseDown={handleRemoveRow}
							className='st-h-36 st-px-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-gray-100 st-text-gray-500 st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-gray-200'
						>
							<Icon className='st-s-16'>
								<LayoutList />
							</Icon>
							<div className='st-font-medium st-text-subhead'>Delete row</div>
						</div>
						<div
							onMouseDown={handleToggleBorders}
							className='st-h-36 st-px-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-gray-100 st-text-gray-500 st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-gray-200'
						>
							<Icon className='st-s-16'>{hasBorders ? <BorderAll /> : <BorderNone />}</Icon>
							<div className='st-font-medium st-text-subhead'>Toggle borders</div>
						</div>
					</div>
					<div className='st-flex-1 st-space-y-8'>
						<div
							onMouseDown={handleInsertRowBelow}
							className='st-h-36 st-px-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-gray-100 st-text-gray-500 st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-gray-200'
						>
							<Icon className='st-s-16'>
								<RowInsertBottom />
							</Icon>
							<div className='st-font-medium st-text-subhead'>Add row below</div>
						</div>
						<div
							onMouseDown={handleInsertColRight}
							className='st-h-36 st-pl-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-gray-100 st-text-gray-500 st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-gray-200'
						>
							<Icon className='st-s-16'>
								<ColumnInsertRight />
							</Icon>
							<div className='st-font-medium st-text-subhead'>Add column right</div>
						</div>
						<div
							onMouseDown={handleRemoveColumn}
							className='st-h-36 st-px-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-gray-100 st-text-gray-500 st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-gray-200'
						>
							<Icon className='st-s-16 st-transform st-rotate-90'>
								<LayoutList />
							</Icon>
							<div className='st-font-medium st-text-subhead'>Delete column</div>
						</div>
						<div
							onMouseDown={handleRemoveTable}
							className='st-h-36 st-px-6 st-flex st-items-center st-space-x-4 st-w-full st-bg-red-300 st-text-white st-rounded-default st-cursor-pointer st-transition-colors st-duration-125 hover:st-bg-red-400'
						>
							<Icon className='st-s-16'>
								<Trash />
							</Icon>
							<div className='st-font-medium st-text-subhead'>Delete table</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const TableTools = memo(BaseTableTools);
