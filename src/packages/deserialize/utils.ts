import {Descendant, Element, Text} from 'slate';
import {
	StencylAlignment,
	StencylEditor,
	StencylElement,
	StencylMarks,
	StencylText,
} from '../../types';

import {StencylCssRule} from '../css-parser';
import constants from '../../constants';
import {getEmptyTextNode} from '../common/utils';
import htmlNodeTypes from '../../constants/html-node-types';
import {isBlackColor} from '../../utils';
import {jsx} from 'slate-hyperscript';

export type DeserializeFn = (
	element: Node,
	children: Descendant[],
	styles: Array<StencylCssRule>,
) => Descendant | null;

export function cruftFilterFn(element: HTMLElement) {
	return !(element.nodeName === '#text' && /^[\n]{1,}\s*$/.test(element.nodeValue ?? ''));
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
): element is HTMLElement {
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
		nodes = [{type: 'paragraph', children: getEmptyTextNode()}, ...nodes];
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

export function getNodeStyleFromDeclaration<T extends keyof CSSStyleDeclaration>(
	declaration: CSSStyleDeclaration,
	key: T,
) {
	return declaration[key];
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

export function getNodeIndentationFromDeclaration(declaration: CSSStyleDeclaration) {
	const marginLeft = getNodeStyleFromDeclaration(declaration, 'marginLeft');

	if (marginLeft?.length) {
		const parsed = parseFloat(marginLeft);

		if (parsed) {
			return Math.round((parsed * 100) / constants.paperSizes.a4.width);
		}
	}

	return undefined;
}

export function getNodeTextContent(node: Node): string {
	const text = node.textContent ?? '';

	return text === '\n' ? text : text.replace(/[\n]/gi, ' ');
}

export function getStyleDeclaration(
	element: HTMLElement,
	styles: Array<StencylCssRule>,
): CSSStyleDeclaration {
	const style = element.style;

	if (!element.className) {
		return style;
	}

	const useQuickCheck = styles.flatMap((o) => o.selectors).length >= 20;

	styles
		.filter((o) =>
			o.selectors.some((selector) => {
				try {
					return useQuickCheck
						? selector.includes(`.${element.className}`)
						: element.matches(selector);
				} catch (error) {
					return false;
				}
			}),
		)
		.forEach((rule) => {
			rule.declarations.forEach((declaration) =>
				style.setProperty(declaration.property, declaration.value, declaration.priority),
			);
		});

	return style;
}

export function getMarksFromStyleDeclaration(styles: CSSStyleDeclaration): StencylMarks {
	const marks: StencylMarks = {};

	if (['bold', '700'].includes(styles.fontWeight)) {
		marks.bold = true;
	}

	if (styles.fontStyle === 'italic') {
		marks.italic = true;
	}

	if (styles.textDecoration === 'underline') {
		marks.underline = true;
	}

	if (styles.textDecoration === 'line-through') {
		marks.strikethrough = true;
	}

	if (!isBlackColor(styles.color)) {
		marks.color = styles.color;
	}

	return marks;
}
