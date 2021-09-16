import {DependencyList, MouseEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {EditableElement, ImageElement, TableElement} from '../types';
import {useFocused, useSlate} from 'slate-react';

import {NodeEntry} from 'slate';
import {getConfigurableBlockInSelection} from '../packages/common/utils';
import {sleep} from '../utils';
import useDebouncedEffectLib from 'use-debounced-effect';

export type ModalActions = {
	visible: boolean;
	open: Fn;
	close: () => Promise<void>;
	toggle: Fn;
};

export function useMouseDown(fn?: Fn): (e: MouseEvent) => void {
	return useCallback(
		(e: MouseEvent) => {
			e?.preventDefault();
			fn?.();
		},
		[fn],
	);
}

export function useModalUtils(initialOpen: boolean = false, animationDuration = 0): ModalActions {
	const [visible, setVisible] = useState(initialOpen);

	const handleOpen = useCallback(() => {
		setVisible(true);
	}, []);

	const handleClose = useCallback(async () => {
		setVisible(false);
		await sleep(animationDuration);
		return Promise.resolve();
	}, [animationDuration]);

	const handleToggle = useCallback(() => {
		setVisible((o) => !o);
	}, []);

	const actions: ModalActions = useMemo(
		() => ({
			visible,
			open: handleOpen,
			close: handleClose,
			toggle: handleToggle,
		}),
		[handleClose, handleOpen, handleToggle, visible],
	);

	return actions;
}

export function useBooleanState(initialState: boolean) {
	const [state, setState] = useState(initialState);
	const toggleState = useCallback(() => {
		setState((o) => !o);
	}, []);
	return [state, toggleState, setState] as const;
}

export function useDebounceEffect(callback: Fn, deps: DependencyList, delay = 500) {
	return useDebouncedEffectLib(callback, delay, deps);
}

export function useEditingBlock() {
	const editor = useSlate();
	const focused = useFocused();
	const [entry, setEntry] = useState<NodeEntry<ImageElement | TableElement | EditableElement>>();

	useEffect(() => {
		const block = getConfigurableBlockInSelection(editor);
		setEntry((o) => (focused ? block : o));
	}, [editor.selection, focused]);

	return entry;
}

export function withMouseDown(fn?: Fn): (e: MouseEvent) => void {
	const wrapped = (e: MouseEvent) => {
		e?.preventDefault();
		fn?.();
	};
	return wrapped;
}
