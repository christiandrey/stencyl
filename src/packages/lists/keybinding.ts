import {decreaseListNesting, increaseListNesting} from './commands';

import {KeyBindingFn} from '../keybindings';
import {isBlockActive} from '../common/utils';

export const listsKeyBindings: KeyBindingFn = () => ({
	tab: (editor, e) => {
		const isActive = isBlockActive(editor, 'list-item');

		if (isActive) {
			e.preventDefault();
			increaseListNesting(editor);
		}
	},
	'shift+tab': (editor, e) => {
		const isActive = isBlockActive(editor, 'list-item');

		if (isActive) {
			e.preventDefault();
			decreaseListNesting(editor);
		}
	},
});
