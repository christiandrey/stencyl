import {IconButton} from '../../../icon-button';
import {ReactComponent as Italic} from '../../../../../../assets/images/icon-italic.svg';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';
import {isMarkActive} from '../../../../../../packages/common/utils';
import {toggleItalicMark} from '../../../../../../packages/leaf/commands';
import {useSlate} from 'slate-react';

export const ItalicButton = () => {
	const editor = useSlate();
	const isActive = isMarkActive(editor, 'italic');

	const handlePress = () => {
		toggleItalicMark(editor);
	};

	return (
		<IconButton
			onPress={handlePress}
			active={isActive}
			tip={`Italic ${getShortcutText('Mod', 'I')}`}
		>
			<Italic />
		</IconButton>
	);
};
