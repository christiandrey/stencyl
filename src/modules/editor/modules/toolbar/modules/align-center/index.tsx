import {ReactComponent as AlignCenter} from '../../../../../../assets/images/icon-align-center.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';

export const AlignCenterButton = () => {
	return (
		<IconButton tip='Center align'>
			<AlignCenter />
		</IconButton>
	);
};
