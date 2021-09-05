import {IconButton} from '../../../icon-button';
import {ReactComponent as List} from '../../../../../../assets/images/icon-list.svg';
import React from 'react';

export const BulletedListButton = () => {
	return (
		<IconButton tip='Bulleted list'>
			<List />
		</IconButton>
	);
};
