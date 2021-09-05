import {ReactComponent as ArrowBackUp} from '../../../../../../assets/images/icon-arrow-back-up.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';

export const UndoButton = () => {
	return (
		<IconButton tip={`Undo ${getShortcutText('Mod', 'Z')}`}>
			<ArrowBackUp />
		</IconButton>
	);
};
