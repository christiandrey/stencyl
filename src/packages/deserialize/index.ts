import {
	DeserializeFn,
	cruftFilterFn,
	deserializeToFragment,
	deserializeToLeaf,
	getNodeTextContent,
	invalidNodesFilterFn,
	matchHTMLElementNode,
	normalizeFirstNode,
	wrapInlineTopLevelNodesInParagraph,
} from './utils';
import {deserializeBody, deserializeLineBreak, deserializeMarks} from './rules';

import {Descendant} from 'slate';
import {EMPTY_TEXT_NODE} from '../common/utils';
import {StencylEditor} from '../../types';
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
import {notNil} from '../../utils';

export const withHTMLDeserializer = (editor: StencylEditor) => {
	const {insertData} = editor;

	editor.insertData = (data) => {
		const html = data.getData('text/html');

		if (html) {
			// console.log(html);
			const fragment = deserializeHTML(html, editor);
			// console.log('FRAGMENT', fragment);
			console.time('PASTEOPERATION');
			editor.insertFragment(fragment);
			// console.log('AFTER', editor.children);
			console.timeEnd('PASTEOPERATION');
			return;
		}

		insertData(data);
	};

	return editor;
};

const VOID_NODES = [htmlNodeNames.IMG];

const rules: Array<DeserializeFn> = [
	deserializeBody,
	deserializeLineBreak,
	deserializeBlockquote,
	deserializeCodeblock,
	deserializeHeadings,
	deserializeImage,
	deserializeLink,
	deserializeLists,
	deserializeParagraph,
	deserializeTable,
	deserializeMarks,
];

function deserializeHTML(html: string, editor: StencylEditor) {
	const parsed = new DOMParser().parseFromString(html, 'text/html');
	// console.log(parsed.body);
	const children = deserializeHTMLElements(Array.from(parsed.body.childNodes));
	return deserializeToFragment(
		normalizeFirstNode(wrapInlineTopLevelNodesInParagraph(editor, children)),
	);
}

function deserializeHTMLElements(elements: Array<Node>) {
	let nodes: Descendant[] = [];

	elements
		.filter(cruftFilterFn)
		.filter(invalidNodesFilterFn)
		.forEach((o) => {
			const result = deserializeHTMLElement(o);

			if (Array.isArray(result)) {
				nodes = nodes.concat(result);
			} else {
				if (notNil(result)) {
					nodes.push(result);
				}
			}
		});

	return nodes;
}

function deserializeHTMLElement(element: Node) {
	let children = deserializeHTMLElements(normalizeChildNodes(element.childNodes, element));

	if (!children?.length && !VOID_NODES.includes(element.nodeName)) {
		return deserializeToLeaf({text: getNodeTextContent(element)});
	}

	children = children.length ? children : EMPTY_TEXT_NODE;

	for (const rule of rules) {
		const result = rule(element, children);

		if (typeof result === 'undefined') {
			continue;
		}

		return result;
	}

	if (children?.length) {
		return children;
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
