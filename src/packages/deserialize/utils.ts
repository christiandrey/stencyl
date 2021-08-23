import {StencylElement, StencylText} from '../../types';

import {Descendant} from 'slate';
import htmlNodeTypes from '../../constants/html-node-types';
import {jsx} from 'slate-hyperscript';

export type DeserializeFn = (
	element: HTMLElement,
	children: Descendant[],
) => Descendant | Descendant[] | null | undefined;

export function cruftFilterFn(element: HTMLElement) {
	return !(element.nodeName === '#text' && element.nodeValue === '\n');
}

export function deserializeToFragment(children: Array<any>) {
	return jsx('fragment', {}, children);
}

export function deserializeToElement(attributes: Partial<StencylElement>, children: Array<any>) {
	return jsx('element', attributes, children);
}

export function deserializeToLeaf(attributes: Partial<StencylText>, child: any) {
	return jsx('text', attributes, child);
}

export function matchHTMLNode(
	element: HTMLElement,
	rules: {nodeName?: string; nodeType?: number; nodeValue?: string | null} = {},
) {
	return Object.keys(rules).every((o) => element[o] === rules[o]);
}

export function matchHTMLElementNode(
	element: HTMLElement,
	rules: {nodeName?: string; nodeType?: number; nodeValue?: string | null} = {},
) {
	return matchHTMLNode(element, {nodeType: htmlNodeTypes.ELEMENT_NODE, ...rules});
}

export function matchHTMLTextNode(
	element: HTMLElement,
	rules: {nodeName?: string; nodeType?: number; nodeValue?: string | null} = {},
) {
	return matchHTMLNode(element, {nodeType: htmlNodeTypes.TEXT_NODE, ...rules});
}
