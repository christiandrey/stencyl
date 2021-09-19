import {IconButton} from '../../../icon-button';
import React from 'react';
import {ReactComponent as Underline} from '../../../../../../assets/images/icon-underline.svg';
import {getShortcutText} from '../../../../../../utils';
import {isMarkActive} from '../../../../../../packages/common/utils';
import {toggleUnderlineMark} from '../../../../../../packages/leaf/commands';
import {useSlate} from 'slate-react';

export const UnderlineButton = () => {
	const editor = useSlate();
	const isActive = isMarkActive(editor, 'underline');

	const handlePress = () => {
		toggleUnderlineMark(editor);
	};

	return (
		<IconButton
			onPress={handlePress}
			active={isActive}
			tip={`Underline ${getShortcutText('Mod', 'U')}`}
		>
			<Underline />
		</IconButton>
	);
};
