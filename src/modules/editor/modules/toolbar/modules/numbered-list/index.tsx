import {
	insertNumberedListBlock,
	removeListItemBlock,
} from '../../../../../../packages/lists/commands';

import {IconButton} from '../../../icon-button';
import {ReactComponent as ListNumbers} from '../../../../../../assets/images/icon-list-numbers.svg';
import React from 'react';
import {isBlockActive} from '../../../../../../packages/common/utils';
import {useSlate} from 'slate-react';

export const NumberedListButton = () => {
	const editor = useSlate();
	const isActive = isBlockActive(editor, 'numbered-list', 'lowest');

	const handlePress = () => {
		isActive ? removeListItemBlock(editor) : insertNumberedListBlock(editor);
	};

	return (
		<IconButton onPress={handlePress} active={isActive} tip='Numbered list'>
			<ListNumbers />
		</IconButton>
	);
};
