import {IconButton} from '../../../icon-button';
import {ReactComponent as IndentIncrease} from '../../../../../../assets/images/icon-indent-increase.svg';
import React from 'react';
import {changeBlockIndentation} from '../../../../../../packages/common/commands';
import {useSlateStatic} from 'slate-react';

export const IndentIncreaseButton = () => {
	const editor = useSlateStatic();

	const handlePress = () => {
		changeBlockIndentation(editor, 'increment');
	};

	return (
		<IconButton onPress={handlePress} tip='Increase indent'>
			<IndentIncrease />
		</IconButton>
	);
};
