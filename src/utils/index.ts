import {KeyboardEvent} from 'react';
import alphanumerize from 'alphanumerize';
import format from 'date-fns/format';
import hexAlpha from 'hex-alpha';
import isUrl from 'is-url';
import romanize from 'romanize';
import {v4 as uuidv4} from 'uuid';

export const IS_MAC =
	typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

export function sleep(timeInMs: number = 0) {
	return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

export function notNil<T>(value?: T | null): value is T {
	return typeof value !== 'undefined' && value !== null;
}

export function nil<T>(value?: T | null): value is undefined | null {
	return !notNil(value);
}

export function getPlaceholderImage(width: number, height?: number) {
	return `https://dummyimage.com/${width}x${height || width}/326FF3/FFFFFF`;
}

export function toTitleCase(text: string) {
	if (!text?.length) {
		return text;
	}
	const firstValidCharPosition = text.search(/[a-zA-Z0-9]/);

	if (!~firstValidCharPosition) {
		return text;
	}

	return `${text.slice(0, firstValidCharPosition)}${text[
		firstValidCharPosition
	].toUpperCase()}${text.slice(firstValidCharPosition + 1)}`;
}

export function generateUUID() {
	return uuidv4();
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

export function lastItem<T>(list: Array<T>, steps = 0): T {
	return list[list.length - 1 - steps];
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

export function unsetProperty<T>(source: T, key: keyof T): T {
	const clone = {...source};
	delete clone[key];
	return clone;
}

export function getRgbaColor(hex: string = '#000', alpha = 1) {
	hex = hex.startsWith('#') ? hex : `#${hex}`;
	return hexAlpha(hex, alpha);
}

export function getShortcutText(...keys: string[]) {
	keys = keys.filter((o) => !!o).map((o) => toTitleCase(o).replace('Mod', IS_MAC ? '⌘' : 'Ctrl'));
	return `(${keys.join(
		!IS_MAC || keys.length > 2 || !(keys[0] === '⌘' && /[A-Z]/.test(keys[1])) ? '+' : '',
	)})`;
}

export function isEqualColor(left?: string, right?: string) {
	if (!left || !right) {
		return false;
	}

	left = left.startsWith('#') ? left : `#${left}`;
	right = right.startsWith('#') ? right : `#${right}`;
	return left.toLowerCase() === right.toLowerCase();
}

export function isEnterKey(e: KeyboardEvent) {
	return e.key?.toLowerCase() === 'enter';
}

export function toRomanNumeral(value: number): string {
	return romanize(value ?? 1);
}

export function toAlphabetNumeral(value: number): string {
	return alphanumerize(value ?? 1);
}

export function isObjectEqual<T extends object>(left?: T, right?: T) {
	if (left === right) {
		return true;
	}

	if (!left || !right || Object.keys(left).length !== Object.keys(right).length) {
		return false;
	}

	return !Object.keys(left).some((key) => left[key] !== right[key]);
}
