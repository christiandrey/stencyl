import {ReactComponent as EditCircle} from '../../../../../../assets/images/icon-edit-circle.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';

export const InsertEditableButton = () => {
	return (
		<IconButton tip='Insert editable...'>
			<EditCircle />
		</IconButton>
	);
};
