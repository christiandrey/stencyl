import {ReactComponent as AlignLeft} from '../../../../../../assets/images/icon-align-left.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';

export const AlignLeftButton = () => {
	return (
		<IconButton tip='Left align'>
			<AlignLeft />
		</IconButton>
	);
};
