import {IconButton} from '../../../icon-button';
import {ReactComponent as IndentIncrease} from '../../../../../../assets/images/icon-indent-increase.svg';
import React from 'react';

export const IndentIncreaseButton = () => {
	return (
		<IconButton tip='Increase indent'>
			<IndentIncrease />
		</IconButton>
	);
};
