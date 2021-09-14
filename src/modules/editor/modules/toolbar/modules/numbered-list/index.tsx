import {
	insertNumberedListBlock,
	removeListItemBlock,
} from '../../../../../../packages/lists/commands';

import {IconButton} from '../../../icon-button';
import {ReactComponent as ListNumbers} from '../../../../../../assets/images/icon-list-numbers.svg';
import React from 'react';
import {getCurrentListBlock} from '../../../../../../packages/lists/utils';
import {useSlate} from 'slate-react';

export const NumberedListButton = () => {
	const editor = useSlate();
	const listBlock = getCurrentListBlock(editor);
	const isActive = listBlock && listBlock[0].type === 'numbered-list';

	const handlePress = () => {
		isActive ? removeListItemBlock(editor) : insertNumberedListBlock(editor);
	};

	return (
		<IconButton onPress={handlePress} active={isActive} tip='Numbered list'>
			<ListNumbers />
		</IconButton>
	);
};
