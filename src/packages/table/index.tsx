import React, {FC} from 'react';

import {RenderElementProps} from 'slate-react';

export const TableCell: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'table-cell') {
		return (
			<td
				{...attributes}
				width={element.width}
				height={element.height}
				colSpan={element.colspan ?? 1}
				rowSpan={element.rowspan ?? 1}
				style={{
					borderColor: element.borderColor,
					borderWidth: element.borderWidth,
				}}
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
			<table {...attributes} className='border-collapse'>
				{children}
			</table>
		);
	}

	return null;
};
