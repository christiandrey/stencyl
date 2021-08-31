import {
	DeserializeFn,
	cruftFilterFn,
	deserializeToFragment,
	deserializeToLeaf,
	getNodeTextContent,
	invalidNodesFilterFn,
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
import {notNil} from '../../utils';

export const withHTMLDeserializer = (editor: StencylEditor) => {
	const {insertData} = editor;

	editor.insertData = (data) => {
		const html = data.getData('text/html');

		if (html) {
			// console.log(html);
			const fragment = deserializeHTML(html, editor);
			console.log('FRAGMENT', fragment);
			editor.insertFragment(fragment);
			console.log('AFTER', editor.children);
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
	let children = deserializeHTMLElements(Array.from(element.childNodes));

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
