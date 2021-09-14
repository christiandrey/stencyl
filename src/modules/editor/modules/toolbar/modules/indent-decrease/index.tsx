import {IconButton} from '../../../icon-button';
import {ReactComponent as IndentDecrease} from '../../../../../../assets/images/icon-indent-decrease.svg';
import React from 'react';
import {changeBlockIndentation} from '../../../../../../packages/common/commands';
import {useSlateStatic} from 'slate-react';

export const IndentDecreaseButton = () => {
	const editor = useSlateStatic();

	const handlePress = () => {
		changeBlockIndentation(editor, 'decrement');
	};

	return (
		<IconButton onPress={handlePress} tip='Decrease indent'>
			<IndentDecrease />
		</IconButton>
	);
};
