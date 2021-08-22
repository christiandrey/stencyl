import React, {FC} from 'react';

import {RenderElementProps} from 'slate-react';
import classNames from 'classnames';
import css from './style.module.css';

export const TableCell: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'table-cell') {
		return (
			<td
				{...attributes}
				width={element.width}
				height={element.height}
				colSpan={element.colspan ?? 1}
				rowSpan={element.rowspan ?? 1}
			>
				{children}
			</td>
		);
	}

	return null;
};

export const TableRow: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'table-row') {
		return <tr {...attributes}>{children}</tr>;
	}

	return null;
};

export const Table: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'table') {
		return (
			<table
				{...attributes}
				className={classNames({
					[css.borderless]: element.borderless,
				})}
			>
				{children}
			</table>
		);
	}

	return null;
};
