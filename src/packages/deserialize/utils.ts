import {Descendant, Element, Text} from 'slate';
import {StencylAlignment, StencylEditor, StencylElement, StencylText} from '../../types';

import {EMPTY_TEXT_NODE} from '../common/utils';
import constants from '../../constants';
import htmlNodeTypes from '../../constants/html-node-types';
import {jsx} from 'slate-hyperscript';

export type DeserializedChildren = Descendant | Descendant[] | undefined | null;

export type DeserializeFn = (element: Node, children: Descendant[]) => DeserializedChildren;

export function cruftFilterFn(element: HTMLElement) {
	return !(element.nodeName === '#text' && /^[\n]{1,}$/.test(element.nodeValue ?? ''));
}

export function invalidNodesFilterFn(element: HTMLElement) {
	return [htmlNodeTypes.ELEMENT_NODE, htmlNodeTypes.TEXT_NODE].includes(element.nodeType);
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
	const wrappedNodes: Array<Descendant> = [];
	const pendingNodes: Array<Descendant> = [];

	const flushPendingNodes = () => {
		if (pendingNodes.length) {
			wrappedNodes.push(
				deserializeToElement(
					{
						type: 'paragraph',
					},
					pendingNodes,
				),
			);
			pendingNodes.length = 0;
		}
	};

	for (const node of nodes) {
		const isInline = Text.isText(node) || editor.isInline(node);

		if (isInline) {
			pendingNodes.push(node);
		} else {
			flushPendingNodes();
			wrappedNodes.push(node);
		}
	}

	flushPendingNodes();

	return wrappedNodes;
}

export function normalizeFirstNode(nodes: Descendant[]) {
	if (!nodes.length) {
		return nodes;
	}

	const firstNode = nodes[0];

	if (Element.isElement(firstNode) && firstNode.type !== 'paragraph') {
		nodes = [{type: 'paragraph', children: EMPTY_TEXT_NODE}, ...nodes];
	}

	return nodes;
}

export function getNodeStyle<T extends keyof CSSStyleDeclaration>(
	node: Node,
	key: T,
): CSSStyleDeclaration[T] | undefined {
	if (node instanceof HTMLElement) {
		return node.style[key];
	}

	return undefined;
}

export function getNodeAttribute(node: Node, key: string): string | undefined {
	if (node instanceof HTMLElement) {
		return node.getAttribute(key) ?? undefined;
	}

	return undefined;
}

export function getStencylAlignmentAttribute(
	alignment: string | undefined,
): StencylAlignment | undefined {
	if (!alignment) {
		return undefined;
	}

	if (['start', 'left'].includes(alignment)) {
		return 'left';
	}

	if (['end', 'right'].includes(alignment)) {
		return 'right';
	}

	if (['center'].includes(alignment)) {
		return 'center';
	}

	if (['justify'].includes(alignment)) {
		return 'justify';
	}

	return undefined;
}

export function getNodeIndentation(node: Node): number | undefined {
	if (node instanceof HTMLElement) {
		const marginLeft = getNodeStyle(node, 'marginLeft');

		if (marginLeft?.length) {
			const parsed = parseFloat(marginLeft);

			if (parsed) {
				return Math.round((parsed * 100) / constants.paperSizes.a4.width);
			}
		}
	}

	return undefined;
}

export function getNodeTextContent(node: Node): string {
	const text = node.textContent ?? '';

	return text === '\n' ? text : text.replace(/[\n]/gi, ' ');
}
