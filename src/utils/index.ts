import format from 'date-fns/format';
import isUrl from 'is-url';

export function notNil<T>(value?: T | null): value is T {
	return typeof value !== 'undefined' && value !== null;
}

export function nil<T>(value?: T | null): value is undefined | null {
	return !notNil(value);
}

export function getPlaceholderImage(width: number, height?: number) {
	return `https://dummyimage.com/${width}x${height || width}/326FF3/FFFFFF`;
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function formatDate(
	dateTime: Date | string | number,
	token = 'yyyy-MM-dd',
): string | undefined {
	if (nil(dateTime)) return undefined;

	try {
		return format(new Date(dateTime), token);
	} catch (error) {
		return undefined;
	}
}

export function runIfDefined<T, R>(value?: T | null, fn?: (o: T) => R): R | undefined {
	if (notNil(value)) {
		return fn?.(value) ?? undefined;
	}

	return undefined;
}

export function isValidUrl(text?: string | null) {
	if (!text?.length) {
		return false;
	}

	return isUrl(text);
}

export function lastItem<T>(list: Array<T>): T {
	return list[list.length - 1];
}

export function array(size = 3): Array<number> {
	return new Array(size).fill(null).map((_o, i) => i);
}

export function pipeline<T extends (...args: any[]) => any>(fns: Array<T>) {
	return (...args: unknown[]) => {
		let res: ReturnType<T> | undefined;

		for (let i = 0; i < fns.length; i++) {
			const fn = fns[i];
			res = i ? fn(res) : fn(...args);
		}

		return res as ReturnType<T>;
	};
}
