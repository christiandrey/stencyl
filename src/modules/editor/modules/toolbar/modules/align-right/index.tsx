import {ReactComponent as AlignRight} from '../../../../../../assets/images/icon-align-right.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getCurrentBlockAlignment} from '../../../../../../packages/common/utils';
import {setBlockAlignment} from '../../../../../../packages/common/commands';
import {useSlate} from 'slate-react';

export const AlignRightButton = () => {
	const editor = useSlate();
	const alignment = getCurrentBlockAlignment(editor);

	const handlePress = () => {
		setBlockAlignment(editor, 'right');
	};

	return (
		<IconButton onPress={handlePress} active={alignment === 'right'} tip='Right align'>
			<AlignRight />
		</IconButton>
	);
};
