import React, {FC, useRef} from 'react';

import {PdfRenderLeafProps} from '../../types';
import {Style} from '@react-pdf/types';
import {Text} from '@react-pdf/renderer';
import {previewDatasetState} from '../../../state';
import {shouldRenderByCondition} from '../../../utils';
import {styles} from '../../styles';
import {useHookStateStatic} from '../../../../../packages/hookstate/hooks';

export const Leaf: FC<PdfRenderLeafProps> = ({children, leaf}) => {
	const [dataset] = useHookStateStatic(previewDatasetState);
	const shouldRender = shouldRenderByCondition(dataset, leaf.condition);
	const style = useRef({} as Style).current;

	if (!shouldRender) {
		return null;
	}

	if (leaf.bold) {
		style.fontWeight = 'bold';
	}

	if (leaf.code) {
		style.fontFamily = 'monospace';
	}

	if (leaf.italic) {
		style.fontStyle = 'italic';
	}

	if (leaf.underline) {
		style.textDecoration = 'underline';
	}

	if (leaf.strikethrough) {
		style.textDecoration = 'line-through';
	}

	return <Text style={[styles.leaf, style, {color: leaf.color}]}>{children}</Text>;
};
