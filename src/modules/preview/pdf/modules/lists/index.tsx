import React, {FC, useMemo} from 'react';
import {Text, View} from '@react-pdf/renderer';

import {PdfRenderElementProps} from '../../types';
import {Style} from '@react-pdf/types';
import {getListItemSymbol} from '../../../utils';
import {styles} from '../../styles';

export const List: FC<PdfRenderElementProps> = ({element, children}) => {
	const style = useMemo(() => {
		const properties: Style = {};

		if (element.type === 'numbered-list' || element.type === 'bulleted-list') {
			if (element.indentation) {
				properties.marginLeft = `${element.indentation}%`;
			}
		}

		return properties;
	}, [element]);

	if (element.type === 'bulleted-list') {
		return <View style={[styles.list, style]}>{children}</View>;
	}

	if (element.type === 'numbered-list') {
		return <View style={[styles.list, style]}>{children}</View>;
	}

	return null;
};

export const ListItem: FC<PdfRenderElementProps> = ({
	element,
	children,
	level,
	path,
	parentType,
}) => {
	if (element.type === 'list-item') {
		return (
			<View style={styles.listItem}>
				<Text style={styles.listItemSymbol}>{getListItemSymbol(path, parentType, level)}</Text>
				{children}
			</View>
		);
	}

	return null;
};

export const ListItemContainer: FC<PdfRenderElementProps> = ({element, children}) => {
	if (element.type === 'list-item-container') {
		return <View>{children}</View>;
	}

	return null;
};
