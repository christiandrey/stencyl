import React, {FC} from 'react';

import {Link as PdfLink} from '@react-pdf/renderer';
import {PdfRenderElementProps} from '../../types';
import {styles} from '../../styles';

export const Link: FC<PdfRenderElementProps> = ({element, children}) => {
	return (
		<PdfLink style={styles.link} src={element.type === 'link' ? element.url : ''}>
			{children}
		</PdfLink>
	);
};
