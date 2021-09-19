import {StencylEditor} from '../../types';
import {deactivateBlock} from '../common/commands';

export function setBlockAsParagraph(editor: StencylEditor) {
	deactivateBlock(editor);
}
