import {ReactComponent as AlignLeft} from '../../../../../../assets/images/icon-align-left.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getCurrentBlockAlignment} from '../../../../../../packages/common/utils';
import {setBlockAlignment} from '../../../../../../packages/common/commands';
import {useSlate} from 'slate-react';

export const AlignLeftButton = () => {
	const editor = useSlate();
	const alignment = getCurrentBlockAlignment(editor);

	const handlePress = () => {
		setBlockAlignment(editor, 'left');
	};

	return (
		<IconButton onPress={handlePress} active={alignment === 'left'} tip='Left align'>
			<AlignLeft />
		</IconButton>
	);
};
