import {IconButton} from '../../../icon-button';
import React from 'react';
import {ReactComponent as Strikethrough} from '../../../../../../assets/images/icon-strikethrough.svg';
import {getShortcutText} from '../../../../../../utils';
import {isMarkActive} from '../../../../../../packages/common/utils';
import {toggleStrikethroughMark} from '../../../../../../packages/leaf/commands';
import {useSlate} from 'slate-react';

export const StrikethroughButton = () => {
	const editor = useSlate();
	const isActive = isMarkActive(editor, 'strikethrough');

	const handlePress = () => {
		toggleStrikethroughMark(editor);
	};

	return (
		<IconButton
			onPress={handlePress}
			active={isActive}
			tip={`Strikethrough ${getShortcutText('Mod', 'Shift', 'X')}`}
		>
			<Strikethrough />
		</IconButton>
	);
};
