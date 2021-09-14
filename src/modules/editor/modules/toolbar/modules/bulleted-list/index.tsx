import {
	insertBulletedListBlock,
	removeListItemBlock,
} from '../../../../../../packages/lists/commands';

import {IconButton} from '../../../icon-button';
import {ReactComponent as List} from '../../../../../../assets/images/icon-list.svg';
import React from 'react';
import {getCurrentListBlock} from '../../../../../../packages/lists/utils';
import {useSlate} from 'slate-react';

export const BulletedListButton = () => {
	const editor = useSlate();
	const listBlock = getCurrentListBlock(editor);
	const isActive = listBlock && listBlock[0].type === 'bulleted-list';

	const handlePress = () => {
		isActive ? removeListItemBlock(editor) : insertBulletedListBlock(editor);
	};

	return (
		<IconButton onPress={handlePress} active={isActive} tip='Bulleted list'>
			<List />
		</IconButton>
	);
};
