import {
	EditableElement,
	StencylDataset,
	StencylDisplayCondition,
	StencylElement,
	StencylElementTypes,
} from '../../../types';
import {formatDate, lastItem, toAlphabetNumeral, toRomanNumeral} from '../../../utils';

import {Descendant} from 'slate';
import {Font} from '@react-pdf/renderer';

export function getValueFromDataset(dataset: StencylDataset, element: EditableElement) {
	const data = dataset[element.id];

	if (!data) {
		return null;
	}

	if (element.dataType === 'date' || element.dataType === 'time') {
		return formatDate(data, element.dateTimeFormat) ?? '';
	}

	if (element.dataType === 'options' || element.dataType === 'radio') {
		return element.options.find((o) => o.id === data)?.label ?? '';
	}

	return data;
}

export function isStencylElement(value: any): value is StencylElement {
	return !!value?.type;
}

export function shouldRenderByCondition(
	dataset: StencylDataset,
	condition?: StencylDisplayCondition | Array<StencylDisplayCondition>,
) {
	const conditions = Array.isArray(condition) ? condition : condition ? [condition] : [];

	if (!conditions.length) {
		return true;
	}

	return !conditions.some((o) => dataset[o.parent] !== o.value);
}

export function getMatchingEditableElement(
	nodes: Array<Descendant>,
	linkId: string,
): EditableElement | undefined {
	const match = nodes.find(
		(o) => isStencylElement(o) && o.type === 'editable' && o.id === linkId,
	) as EditableElement | undefined;

	return (
		match ??
		getMatchingEditableElement(
			nodes
				.filter(isStencylElement)
				.map((o) => o.children)
				.flat(),
			linkId,
		)
	);
}

export function* getEditableElements(
	nodes: Array<Descendant>,
): Generator<EditableElement, void, EditableElement> {
	const matches = nodes.filter(
		(o) => isStencylElement(o) && o.type === 'editable' && !o.linkId,
	) as Array<EditableElement>;

	for (const match of matches) {
		yield match;
	}

	const children = nodes
		.filter(isStencylElement)
		.map((o) => o.children)
		.flat();

	if (children.length) {
		yield* getEditableElements(children);
	}
}

export function getLevelByElementType(element: Descendant, level?: number) {
	if (
		isStencylElement(element) &&
		(element.type === 'bulleted-list' || element.type === 'numbered-list')
	) {
		return (level ?? -1) + 1;
	}

	return level;
}

export const BULLETS = ['•', '◦', '▪'];

function getOrderedListSymbol(level: number, index: number) {
	switch (level) {
		case 0:
			return `${index + 1}.`;
		case 1:
			return `${toRomanNumeral(index + 1).toLowerCase()}.`;
		default:
			return `${toAlphabetNumeral(index + 1)}.`;
	}
}

export function getListItemSymbol(
	path: Array<number>,
	parentType?: StencylElementTypes,
	level?: number,
) {
	if (!parentType || (parentType !== 'bulleted-list' && parentType !== 'numbered-list')) {
		return '';
	}

	level = level ?? 0;
	const index = lastItem(path);

	if (parentType === 'bulleted-list') {
		return BULLETS[level] ?? lastItem(BULLETS);
	}

	return getOrderedListSymbol(level, index);
}

export const registerPdfFonts = Font.register;
