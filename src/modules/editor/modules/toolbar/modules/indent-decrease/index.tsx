import {IconButton} from '../../../icon-button';
import {ReactComponent as IndentDecrease} from '../../../../../../assets/images/icon-indent-decrease.svg';
import React from 'react';

export const IndentDecreaseButton = () => {
	return (
		<IconButton tip='Decrease indent'>
			<IndentDecrease />
		</IconButton>
	);
};
