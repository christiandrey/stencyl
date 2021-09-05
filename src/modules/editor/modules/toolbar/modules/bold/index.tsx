import {ReactComponent as Bold} from '../../../../../../assets/images/icon-bold.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';

export const BoldButton = () => {
	return (
		<IconButton tip={`Bold ${getShortcutText('Mod', 'B')}`}>
			<Bold />
		</IconButton>
	);
};
