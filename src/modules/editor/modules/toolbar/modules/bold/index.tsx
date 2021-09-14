import {ReactComponent as Bold} from '../../../../../../assets/images/icon-bold.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';
import {isMarkActive} from '../../../../../../packages/common/utils';
import {toggleBoldMark} from '../../../../../../packages/leaf/commands';
import {useSlate} from 'slate-react';

export const BoldButton = () => {
	const editor = useSlate();
	const isActive = isMarkActive(editor, 'bold');

	const handlePress = () => {
		toggleBoldMark(editor);
	};

	return (
		<IconButton onPress={handlePress} active={isActive} tip={`Bold ${getShortcutText('Mod', 'B')}`}>
			<Bold />
		</IconButton>
	);
};
