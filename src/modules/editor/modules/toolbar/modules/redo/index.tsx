import {ReactComponent as ArrowForwardUp} from '../../../../../../assets/images/icon-arrow-forward-up.svg';
import {HistoryEditor} from 'slate-history';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';
import {useSlate} from 'slate-react';

export const RedoButton = () => {
	const editor = useSlate();

	const handlePress = () => {
		HistoryEditor.redo(editor);
	};

	return (
		<IconButton
			onPress={handlePress}
			disabled={!editor.history.redos.length}
			tip={`Redo ${getShortcutText('Mod', 'Shift', 'Z')}`}
		>
			<ArrowForwardUp />
		</IconButton>
	);
};
