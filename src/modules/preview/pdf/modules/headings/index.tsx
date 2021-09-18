import React, {FC, useMemo} from 'react';

import {PdfRenderElementProps} from '../../types';
import {Style} from '@react-pdf/types';
import {Text} from '@react-pdf/renderer';
import {styles} from '../../styles';

export const Headings: FC<PdfRenderElementProps> = ({element, children}) => {
	const style = useMemo(() => {
		const properties: Style = {};

		if (
			element.type === 'heading-one' ||
			element.type === 'heading-two' ||
			element.type === 'heading-three' ||
			element.type === 'heading-four' ||
			element.type === 'heading-five' ||
			element.type === 'heading-six'
		) {
			if (element.indentation) {
				properties.marginLeft = `${element.indentation}%`;
			}

			if (element.alignment) {
				properties.textAlign = element.alignment;
			}
		}

		return properties;
	}, [element]);

	switch (element.type) {
		case 'heading-one':
			return <Text style={[styles.h1, style]}>{children}</Text>;
		case 'heading-two':
			return <Text style={[styles.h2, style]}>{children}</Text>;
		case 'heading-three':
			return <Text style={[styles.h3, style]}>{children}</Text>;
		case 'heading-four':
			return <Text style={[styles.h4, style]}>{children}</Text>;
		case 'heading-five':
			return <Text style={[styles.h5, style]}>{children}</Text>;
		case 'heading-six':
			return <Text style={[styles.h6, style]}>{children}</Text>;
		default:
			return null;
	}
};
