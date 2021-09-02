export type HookState<T = unknown> = {
	get: () => T;
	set: (value: T | ((state: T) => T)) => void;
	subscribe: (callback: (state: T) => void) => () => void;
	unsubscribe: (callback: (state: T) => void) => void;
	unsubscribeAll: () => void;
};
