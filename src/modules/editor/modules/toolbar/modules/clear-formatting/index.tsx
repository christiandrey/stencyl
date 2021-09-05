import {ReactComponent as ClearFormatting} from '../../../../../../assets/images/icon-clear-formatting.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';

export const ClearFormattingButton = () => {
	return (
		<IconButton tip='Clear formatting'>
			<ClearFormatting />
		</IconButton>
	);
};
