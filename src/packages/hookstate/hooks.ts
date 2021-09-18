import {useEffect, useMemo, useState} from 'react';

import {HookState} from './types';

export function useHookState<S>(hookState: HookState<S>) {
	const [state, setState] = useState(hookState.get());

	useEffect(() => {
		const unsubscribe = hookState.subscribe(setState);

		return () => {
			unsubscribe();
		};
	}, []);

	return useMemo(() => [state, hookState.set] as const, [state]);
}

export function useHookStateStatic<S>(hookState: HookState<S>) {
	return [hookState.get(), hookState.set] as const;
}
