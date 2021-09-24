import {
	DeserializeFn,
	cruftFilterFn,
	deserializeToFragment,
	deserializeToLeaf,
	invalidNodesFilterFn,
	matchHTMLElementNode,
	normalizeFirstNode,
	wrapInlineTopLevelNodesInParagraph,
} from './utils';
import {StencylCssRule, parseCssFromDocument} from '../css-parser';
import {deserializeLineBreak, deserializeMark} from './rules';

import {Descendant} from 'slate';
import {StencylEditor} from '../..';
import {deserializeBlockquote} from '../blockquote/deserialize';
import {deserializeCodeblock} from '../codeblock/deserialize';
import {deserializeHeadings} from '../headings/deserialize';
import {deserializeImage} from '../image/deserialize';
import {deserializeLink} from '../link/deserialize';
import {deserializeLists} from '../lists/deserialize';
import {deserializeParagraph} from '../paragraph/deserialize';
import {deserializeTable} from '../table/deserialize';
import htmlNodeNames from '../../constants/html-node-names';
import htmlNodeTypes from '../../constants/html-node-types';

const ELEMENT_RULES: Array<DeserializeFn> = [
	deserializeLineBreak,
	deserializeBlockquote,
	deserializeCodeblock,
	deserializeHeadings,
	deserializeImage,
	deserializeLink,
	deserializeLists,
	deserializeParagraph,
	deserializeTable,
];

const ELEMENT_MARKS = [
	htmlNodeNames.SPAN,
	htmlNodeNames.STRONG,
	htmlNodeNames.I,
	htmlNodeNames.B,
	htmlNodeNames.U,
	htmlNodeNames.S,
	htmlNodeNames.CODE,
	htmlNodeNames.FONT,
];

export const withHTMLDeserializer = (editor: StencylEditor) => {
	const {insertData} = editor;

	editor.insertData = (data) => {
		const html = data.getData('text/html');

		if (html) {
			const fragment = deserializeHTML(html, editor);
			editor.insertFragment(fragment);
			return;
		}

		insertData(data);
	};

	return editor;
};

function isElementMark(element: Node) {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.B})) {
		return !element.id?.startsWith('docs-internal-guid-');
	}

	return ELEMENT_MARKS.includes(element.nodeName);
}

function deserializeHTML(html: string, editor: StencylEditor) {
	const parsed = new DOMParser().parseFromString(html, 'text/html');
	const styles = parseCssFromDocument(parsed);
	const deserialized = deserialize(parsed.body, styles);
	return deserializeToFragment(
		normalizeFirstNode(wrapInlineTopLevelNodesInParagraph(editor, deserialized)),
	);
}

function deserialize(element: Node, styles: StencylCssRule[]): Descendant[] {
	// -----------------------------------------------
	// Deserialize Text Nodes
	// -----------------------------------------------
	if (element.nodeType === htmlNodeTypes.TEXT_NODE) {
		const deserialized = deserializeToLeaf({
			text: element.textContent ?? '',
		});
		return deserialized ? [deserialized] : [];
	}

	// -----------------------------------------------
	// Deserialize Marks
	// -----------------------------------------------
	if (isElementMark(element)) {
		const deserialized = deserializeMark(element, [], styles);
		return deserialized ? [deserialized] : [];
	}

	// -----------------------------------------------
	// Deserialize Element Nodes
	// -----------------------------------------------
	const childNodes = normalizeChildNodes(element.childNodes, element)
		.filter(cruftFilterFn)
		.filter(invalidNodesFilterFn);
	const deserializedChildNodes = childNodes
		.map((o) => deserialize(o, styles))
		.flat()
		.filter(Boolean);
	const deserializedElement = deserializeElement(element, deserializedChildNodes, styles);

	if (!deserializedElement) {
		return deserializedChildNodes;
	}

	return [deserializedElement];
}

function deserializeElement(element: Node, children: Descendant[], styles: Array<StencylCssRule>) {
	for (const rule of ELEMENT_RULES) {
		const result = rule(element, children, styles);

		if (!result) {
			continue;
		}

		return result;
	}

	return null;
}

function normalizeChildNodes(childNodeList: NodeListOf<ChildNode>, parent: Node): Array<Node> {
	const childNodes = Array.from(childNodeList);

	if (!matchHTMLElementNode(parent, {nodeName: htmlNodeNames.LI})) {
		return childNodes;
	}

	const validNodes: Array<Node> = [];
	const pendingNodes: Array<Node> = [];
	const validNodeNames = [
		htmlNodeNames.TABLE,
		htmlNodeNames.OL,
		htmlNodeNames.UL,
		htmlNodeNames.LIC,
	];

	for (const node of childNodes) {
		if (node.nodeType === htmlNodeTypes.ELEMENT_NODE && validNodeNames.includes(node.nodeName)) {
			validNodes.push(node);
		} else {
			pendingNodes.push(node);
		}
	}

	if (pendingNodes.length) {
		const container = document.createElement(htmlNodeNames.LIC);
		pendingNodes.forEach((o) => container.appendChild(o));
		return [container, ...validNodes];
	}

	return validNodes;
}
