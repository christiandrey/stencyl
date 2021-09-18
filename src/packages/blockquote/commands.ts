import {activateBlock, deactivateBlock} from '../common/commands';

import {StencylEditor} from '../../types';
import {isBlockActive} from '../common/utils';

export function toggleBlockquote(editor: StencylEditor) {
	isBlockActive(editor, 'block-quote')
		? deactivateBlock(editor)
		: activateBlock(editor, 'block-quote');
}
