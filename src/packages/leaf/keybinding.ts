import {KeyBindingFn} from '../keybindings';

export const leafKeyBindings: KeyBindingFn = () => ({
	'mod+b': () => {
		console.log('BOLD');
	},
	'mod+i': () => {
		console.log('ITALIC');
	},
});
