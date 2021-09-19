import {
	toggleBoldMark,
	toggleItalicMark,
	toggleStrikethroughMark,
	toggleUnderlineMark,
} from './commands';

import {KeyBindingFn} from '../keybindings';

export const leafKeyBindings: KeyBindingFn = () => ({
	'mod+b': (editor) => {
		toggleBoldMark(editor);
	},
	'mod+i': (editor) => {
		toggleItalicMark(editor);
	},
	'mod+u': (editor) => {
		toggleUnderlineMark(editor);
	},
	'mod+shift+x': (editor) => {
		toggleStrikethroughMark(editor);
	},
});
