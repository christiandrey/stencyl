import {activateBlock, deactivateBlock} from '../common/commands';

import {StencylEditor} from '../../types';
import {isBlockActive} from '../common/utils';

export function toggleCodeblock(editor: StencylEditor) {
	isBlockActive(editor, 'code-block')
		? deactivateBlock(editor)
		: activateBlock(editor, 'code-block');
}
