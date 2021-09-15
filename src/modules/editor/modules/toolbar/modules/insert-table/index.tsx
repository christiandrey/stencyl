import {IconButton} from '../../../icon-button';
import React from 'react';
import {ReactComponent as Table} from '../../../../../../assets/images/icon-table.svg';
import {insertTableBlock} from '../../../../../../packages/table/commands';
import {useSlateStatic} from 'slate-react';

export const InsertTableButton = () => {
	const editor = useSlateStatic();

	const handlePress = () => {
		insertTableBlock(editor);
	};

	return (
		<IconButton onPress={handlePress} tip='Insert table'>
			<Table />
		</IconButton>
	);
};
