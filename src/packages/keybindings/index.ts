import {KeyboardEvent} from 'react';
import {StencylEditor} from '../../types';
import {leafKeyBindings} from '../leaf/keybinding';

export type KeyBinding = (editor: StencylEditor, e: KeyboardEvent) => void;

export type KeyBindings = Record<string, KeyBinding>;

export type KeyBindingFn = () => KeyBindings;

// ------------------------------------------------
// Utility Functions
// ------------------------------------------------

export const IS_MAC =
	typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

export function mergeKeyBindings(generators: Array<KeyBindingFn>): KeyBindings {
	let bindings: KeyBindings = {};

	for (const generator of generators) {
		bindings = {...bindings, ...generator()};
	}

	return bindings;
}

export function toHotkey(e: KeyboardEvent) {
	const list: Array<string> = [];
	const key = e.key.toLowerCase();

	if (IS_MAC && e.metaKey) {
		if (key === 'meta') {
			return 'mod';
		}

		list.push('mod');
	}

	if (!IS_MAC && e.ctrlKey) {
		if (key === 'control') {
			return 'mod';
		}

		list.push('mod');
	}

	if (IS_MAC && e.ctrlKey && key !== 'control') {
		list.push('control');
	}

	if (e.altKey && key !== 'alt') {
		list.push('alt');
	}

	if (e.shiftKey && key !== 'shift') {
		list.push('shift');
	}

	list.push(key);

	return list.join('+');
}

// ------------------------------------------------
// Operations
// ------------------------------------------------

const generators: Array<KeyBindingFn> = [leafKeyBindings];

const KEYBINDINGS = mergeKeyBindings(generators);

export function runKeyBindings(editor: StencylEditor, e: KeyboardEvent) {
	const hotkey = toHotkey(e);
	const keybinding = KEYBINDINGS[hotkey];

	if (keybinding) {
		keybinding(editor, e);
	}
}
