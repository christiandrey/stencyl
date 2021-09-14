import {ReactComponent as AlignJustified} from '../../../../../../assets/images/icon-align-justified.svg';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getCurrentBlockAlignment} from '../../../../../../packages/common/utils';
import {setBlockAlignment} from '../../../../../../packages/common/commands';
import {useSlate} from 'slate-react';

export const AlignJustifiedButton = () => {
	const editor = useSlate();
	const alignment = getCurrentBlockAlignment(editor);

	const handlePress = () => {
		setBlockAlignment(editor, 'justify');
	};

	return (
		<IconButton onPress={handlePress} active={alignment === 'justify'} tip='Justify'>
			<AlignJustified />
		</IconButton>
	);
};
