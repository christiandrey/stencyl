import {HookState} from './types';

export function createHookState<T>(initialValue: T): HookState<T> {
	const SUBSCRIBERS: Array<(state: T) => void> = [];
	let STATE: T = initialValue;

	function get() {
		return STATE;
	}

	function set(value: T | ((state: T) => T)) {
		STATE = value instanceof Function ? value(STATE) : value;

		for (const subscriber of SUBSCRIBERS) {
			subscriber(STATE);
		}
	}

	function subscribe(callback: (state: T) => void) {
		SUBSCRIBERS.push(callback);

		return () => {
			unsubscribe(callback);
		};
	}

	function unsubscribe(callback: (state: T) => void) {
		const index = SUBSCRIBERS.indexOf(callback);

		if (!~index) {
			return;
		}

		SUBSCRIBERS.splice(index, 1);
	}

	function unsubscribeAll() {
		SUBSCRIBERS.length = 0;
	}

	return {
		get,
		set,
		subscribe,
		unsubscribe,
		unsubscribeAll,
	};
}
