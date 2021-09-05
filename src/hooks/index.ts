import {MouseEvent, useCallback, useMemo, useState} from 'react';

import {sleep} from '../utils';

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
