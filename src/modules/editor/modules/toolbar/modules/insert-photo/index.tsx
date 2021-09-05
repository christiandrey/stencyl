import {IconButton} from '../../../icon-button';
import {ReactComponent as Photo} from '../../../../../../assets/images/icon-photo.svg';
import React from 'react';

export const InsertPhotoButton = () => {
	return (
		<IconButton tip='Insert photo'>
			<Photo />
		</IconButton>
	);
};
