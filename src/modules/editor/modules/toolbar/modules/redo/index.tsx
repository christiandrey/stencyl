import {ReactComponent as ArrowForwardUp} from '../../../../../../assets/images/icon-arrow-forward-up.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';

export const RedoButton = () => {
	return (
		<IconButton tip={`Redo ${getShortcutText('Mod', 'Shift', 'Z')}`}>
			<ArrowForwardUp />
		</IconButton>
	);
};
