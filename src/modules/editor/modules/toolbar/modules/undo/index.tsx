import {ReactComponent as ArrowBackUp} from '../../../../../../assets/images/icon-arrow-back-up.svg';
import {HistoryEditor} from 'slate-history';
import {IconButton} from '../../../icon-button';
import React from 'react';
import {getShortcutText} from '../../../../../../utils';
import {useSlate} from 'slate-react';

export const UndoButton = () => {
	const editor = useSlate();

	const handlePress = () => {
		HistoryEditor.undo(editor);
	};

	return (
		<IconButton
			onPress={handlePress}
			disabled={!editor.history.undos.length}
			tip={`Undo ${getShortcutText('Mod', 'Z')}`}
		>
			<ArrowBackUp />
		</IconButton>
	);
};
