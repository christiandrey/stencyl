import React, {FC} from 'react';
import {getValueFromDataset, shouldRenderByCondition} from '../../../utils';

import {Leaf} from '../leaf';
import {Image as PdfImage} from '@react-pdf/renderer';
import {PdfRenderElementProps} from '../../types';
import {getPlaceholderImage} from '../../../../../utils';
import {previewDatasetState} from '../../../state';
import {styles} from '../../styles';
import {useHookState} from '../../../../../packages/hookstate/hooks';

export const Editable: FC<PdfRenderElementProps> = ({element}) => {
	const [dataset] = useHookState(previewDatasetState);

	if (
		element.type !== 'editable' ||
		element.isInvisible ||
		!shouldRenderByCondition(dataset, element.marks.condition)
	) {
		return null;
	}

	const value = getValueFromDataset(dataset, element);

	if (element.dataType === 'image') {
		return (
			<PdfImage
				src={value ?? getPlaceholderImage(element.width, element.height)}
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

	return (
		<Leaf
			text={{text: value ?? element.defaultValue}}
			attributes={{'data-slate-leaf': true}}
			leaf={{
				text: value ?? element.defaultValue,
				...element.marks,
			}}
		>
			{value}
		</Leaf>
	);
};
