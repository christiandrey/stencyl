import React, {FC} from 'react';

import {RenderElementProps} from 'slate-react';

export const TableCell: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'table-cell') {
		return (
			<td
				{...attributes}
				height={element.height}
				colSpan={element.colspan ?? 1}
				rowSpan={element.rowspan ?? 1}
				style={{
					borderColor: element.borderColor ?? 'black',
					borderWidth: element.borderWidth ?? 1,
					minWidth: element.width,
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
			<table className='border-collapse'>
				<tbody {...attributes}>{children}</tbody>
			</table>
		);
	}

	return null;
};
