import {DeserializeFn, cruftFilterFn} from './utils';
import {deserializeBody, deserializeLineBreak, deserializeMarks} from './rules';

import {StencylEditor} from '../../types';
import {deserializeBlockquote} from '../blockquote/deserialize';
import {deserializeParagraph} from '../paragraph/deserialize';

export const withHTMLDeserializer = (editor: StencylEditor) => {
	const {insertData} = editor;

	editor.insertData = (data) => {
		const html = data.getData('text/html');

		if (html) {
			// const parsed = new DOMParser().parseFromString(html, 'text/html');
			// console.log(parsed.body);
			const parsed = deserializeHTML(html);
			console.log('PARSED', parsed);
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

function deserializeHTML(html: string) {
	const parsed = new DOMParser().parseFromString(html, 'text/html');
	const childNodes = Array.from(parsed.body.childNodes);
	return deserializeHTMLElements(childNodes);
}

function deserializeHTMLElements(elements: Array<ChildNode>) {
	return elements.filter(cruftFilterFn).map((o) => deserializeHTMLElement(o));
}

function deserializeHTMLElement(element: ChildNode) {
	const children = deserializeHTMLElements(Array.from(element.childNodes));
	console.log(element, children);

	for (const rule of rules) {
		const result = rule(element as any, children as any);

		if (typeof result === 'undefined') {
			continue;
		}

		return result;
	}

	return null;
}
