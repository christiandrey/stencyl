import {Descendant, Text} from 'slate';
import {StencylEditor, StencylElement, StencylText} from '../../types';

import htmlNodeTypes from '../../constants/html-node-types';
import {jsx} from 'slate-hyperscript';

export type DeserializedChildren = Descendant | Descendant[] | undefined | null;

export type DeserializeFn = (element: Node, children: Descendant[]) => DeserializedChildren;

export function cruftFilterFn(element: HTMLElement) {
	return !(element.nodeName === '#text' && element.nodeValue === '\n');
}

export function deserializeToFragment(children: any) {
	return jsx('fragment', {}, children);
}

export function deserializeToElement(attributes: Partial<StencylElement>, children: any) {
	return jsx('element', attributes, children);
}

export function deserializeToLeaf(attributes: Partial<StencylText>, child?: any) {
	return jsx('text', attributes, child);
}

export function matchHTMLNode(
	element: Node,
	rules: {nodeName?: string; nodeType?: number; nodeValue?: string | null} = {},
) {
	return Object.keys(rules).every((o) => element[o] === rules[o]);
}

export function matchHTMLElementNode(
	element: Node,
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

export function wrapInlineTopLevelNodesInParagraph(editor: StencylEditor, nodes: Descendant[]) {
	return nodes.map((o) =>
		Text.isText(o) || editor.isInline(o) ? deserializeToElement({type: 'paragraph'}, [o]) : o,
	);
}
