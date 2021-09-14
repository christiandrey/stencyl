import {
	insertBulletedListBlock,
	removeListItemBlock,
} from '../../../../../../packages/lists/commands';

import {IconButton} from '../../../icon-button';
import {ReactComponent as List} from '../../../../../../assets/images/icon-list.svg';
import React from 'react';
import {isBlockActive} from '../../../../../../packages/common/utils';
import {useSlate} from 'slate-react';

export const BulletedListButton = () => {
	const editor = useSlate();
	const isActive = isBlockActive(editor, 'bulleted-list', 'lowest');

	const handlePress = () => {
		isActive ? removeListItemBlock(editor) : insertBulletedListBlock(editor);
	};

	return (
		<IconButton onPress={handlePress} active={isActive} tip='Bulleted list'>
			<List />
		</IconButton>
	);
};
