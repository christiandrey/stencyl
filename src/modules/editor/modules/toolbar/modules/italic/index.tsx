import {IconButton} from '../../../icon-button';
import {ReactComponent as Italic} from '../../../../../../assets/images/icon-italic.svg';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';

export const ItalicButton = () => {
	return (
		<IconButton tip={`Italic ${getShortcutText('Mod', 'I')}`}>
			<Italic />
		</IconButton>
	);
};
