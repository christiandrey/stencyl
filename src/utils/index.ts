import format from 'date-fns/format';

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
