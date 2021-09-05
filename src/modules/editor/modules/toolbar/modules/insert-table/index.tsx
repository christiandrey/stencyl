import {IconButton} from '../../../icon-button';
import React from 'react';
import {ReactComponent as Table} from '../../../../../../assets/images/icon-table.svg';

export const InsertTableButton = () => {
	return (
		<IconButton tip='Insert table'>
			<Table />
		</IconButton>
	);
};
