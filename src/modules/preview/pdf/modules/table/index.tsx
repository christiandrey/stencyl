import React, {FC} from 'react';

import {PdfRenderElementProps} from '../../types';
import {View} from '@react-pdf/renderer';
import colors from '../../../../../constants/colors';
import {lastItem} from '../../../../../utils';
import {styles} from '../../styles';

export const TableCell: FC<PdfRenderElementProps> = ({element, children, path}) => {
	if (element.type === 'table-cell') {
		return (
			<View
				style={[
					styles.tableCell,
					{
						height: element.height,
						minWidth: element.width,
					},
					element.borderColor !== colors.transparent
						? {
								borderWidth: element.borderWidth ?? 1,
								borderTopWidth: lastItem(path, 1) ? 0 : undefined,
								borderLeftWidth: lastItem(path) ? 0 : undefined,
								borderColor: element.borderColor ?? colors.black,
						  }
						: {},
				]}
			>
				{children}
			</View>
		);
	}

	return null;
};

export const TableRow: FC<PdfRenderElementProps> = ({element, children}) => {
	if (element.type === 'table-row') {
		return <View style={styles.tableRow}>{children}</View>;
	}

	return null;
};

export const Table: FC<PdfRenderElementProps> = ({element, children}) => {
	if (element.type === 'table') {
		return <View>{children}</View>;
	}

	return null;
};
