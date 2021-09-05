import {ReactComponent as AlignRight} from '../../../../../../assets/images/icon-align-right.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';

export const AlignRightButton = () => {
	return (
		<IconButton tip='Right align'>
			<AlignRight />
		</IconButton>
	);
};
