import {
	DeserializeFn,
	cruftFilterFn,
	deserializeToFragment,
	deserializeToLeaf,
	wrapInlineTopLevelNodesInParagraph,
} from './utils';
import {deserializeBody, deserializeLineBreak, deserializeMarks} from './rules';

import {Descendant} from 'slate';
import {StencylEditor} from '../../types';
import {deserializeBlockquote} from '../blockquote/deserialize';
import {deserializeParagraph} from '../paragraph/deserialize';
import {notNil} from '../../utils';

export const withHTMLDeserializer = (editor: StencylEditor) => {
	const {insertData} = editor;

	editor.insertData = (data) => {
		const html = data.getData('text/html');

		if (html) {
			const parsed = deserializeHTML(html, editor);
			console.log(parsed);
			return;
		}

		insertData(data);
	};

	return editor;
};

const rules: Array<DeserializeFn> = [
	deserializeBody,
	deserializeLineBreak,
	deserializeBlockquote,
	deserializeParagraph,
	deserializeMarks,
];

function deserializeHTML(html: string, editor: StencylEditor) {
	const parsed = new DOMParser().parseFromString(html, 'text/html');
	const children = deserializeHTMLElements(Array.from(parsed.body.childNodes));
	return deserializeToFragment(wrapInlineTopLevelNodesInParagraph(editor, children));
}

function deserializeHTMLElements(elements: Array<Node>) {
	let nodes: Descendant[] = [];

	elements.filter(cruftFilterFn).forEach((o) => {
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
	const children = deserializeHTMLElements(Array.from(element.childNodes));

	if (!children?.length) {
		return deserializeToLeaf({text: element.textContent ?? ''});
	}

	for (const rule of rules) {
		const result = rule(element, children);

		if (typeof result === 'undefined') {
			continue;
		}

		return result;
	}

	return null;
}
