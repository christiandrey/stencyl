import {IconButton} from '../../../icon-button';
import React from 'react';
import {ReactComponent as Strikethrough} from '../../../../../../assets/images/icon-strikethrough.svg';
import {getShortcutText} from '../../../../../../utils';

export const StrikethroughButton = () => {
	return (
		<IconButton tip={`Strikethrough ${getShortcutText('Mod', 'Shift', 'X')}`}>
			<Strikethrough />
		</IconButton>
	);
};
