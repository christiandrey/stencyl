import React, {FC, useMemo} from 'react';

import {PdfRenderElementProps} from '../../types';
import {Style} from '@react-pdf/types';
import {View} from '@react-pdf/renderer';
import {styles} from '../../styles';

export const Blockquote: FC<PdfRenderElementProps> = ({element, children}) => {
	const style = useMemo(() => {
		const properties: Style = {};

		if (element.type === 'block-quote') {
			if (element.indentation) {
				properties.marginLeft = `${element.indentation}%`;
			}

			if (element.alignment) {
				properties.textAlign = element.alignment;
			}
		}

		return properties;
	}, [element]);

	return <View style={[styles.blockquote, style]}>{children}</View>;
};
