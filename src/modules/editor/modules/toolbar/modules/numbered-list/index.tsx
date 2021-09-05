import {IconButton} from '../../../icon-button';
import {ReactComponent as ListNumbers} from '../../../../../../assets/images/icon-list-numbers.svg';
import React from 'react';

export const NumberedListButton = () => {
	return (
		<IconButton tip='Numbered list'>
			<ListNumbers />
		</IconButton>
	);
};
