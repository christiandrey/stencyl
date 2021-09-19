import {ReactComponent as ClearFormatting} from '../../../../../../assets/images/icon-clear-formatting.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {clearMarks} from '../../../../../../packages/common/commands';
import {useSlate} from 'slate-react';

export const ClearFormattingButton = () => {
	const editor = useSlate();

	const handlePress = () => {
		clearMarks(editor);
	};

	return (
		<IconButton onPress={handlePress} tip='Clear formatting'>
			<ClearFormatting />
		</IconButton>
	);
};
