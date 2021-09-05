import {IconButton} from '../../../icon-button';
import React from 'react';
import {ReactComponent as Underline} from '../../../../../../assets/images/icon-underline.svg';
import {getShortcutText} from '../../../../../../utils';

export const UnderlineButton = () => {
	return (
		<IconButton tip={`Underline ${getShortcutText('Mod', 'U')}`}>
			<Underline />
		</IconButton>
	);
};
