import {IconButton} from '../../../icon-button';
import {ReactComponent as Pennant} from '../../../../../../assets/images/icon-pennant.svg';
import React from 'react';

export const DisplayFlagButton = () => {
	return (
		<IconButton tip='Display flag'>
			<Pennant />
		</IconButton>
	);
};
