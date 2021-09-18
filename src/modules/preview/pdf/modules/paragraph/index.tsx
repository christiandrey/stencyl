import React, {FC, useMemo} from 'react';

import {PdfRenderElementProps} from '../../types';
import {Style} from '@react-pdf/types';
import {Text} from '@react-pdf/renderer';

export const Paragraph: FC<PdfRenderElementProps> = ({element, children}) => {
	const style = useMemo(() => {
		const properties: Style = {};

		if (element.type === 'paragraph') {
			if (element.indentation) {
				properties.marginLeft = `${element.indentation}%`;
			}

			if (element.alignment) {
				properties.textAlign = element.alignment;
			}
		}

		return properties;
	}, [element]);

	return <Text style={style}>{children}</Text>;
};
