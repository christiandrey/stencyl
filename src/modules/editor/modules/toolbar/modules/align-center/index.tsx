import {ReactComponent as AlignCenter} from '../../../../../../assets/images/icon-align-center.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getCurrentBlockAlignment} from '../../../../../../packages/common/utils';
import {setBlockAlignment} from '../../../../../../packages/common/commands';
import {useSlate} from 'slate-react';

export const AlignCenterButton = () => {
	const editor = useSlate();
	const alignment = getCurrentBlockAlignment(editor);

	const handlePress = () => {
		setBlockAlignment(editor, 'center');
	};

	return (
		<IconButton onPress={handlePress} active={alignment === 'center'} tip='Center align'>
			<AlignCenter />
		</IconButton>
	);
};
