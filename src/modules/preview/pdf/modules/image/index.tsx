import React, {FC} from 'react';

import {Image as PdfImage} from '@react-pdf/renderer';
import {PdfRenderElementProps} from '../../types';
import {styles} from '../../styles';

export const Image: FC<PdfRenderElementProps> = ({element}) => {
	if (element.type === 'image') {
		return (
			<PdfImage
				src={element.url}
				style={[
					styles.image,
					{
						width: element.width,
						height: element.height,
					},
				]}
			/>
		);
	}

	return null;
};
