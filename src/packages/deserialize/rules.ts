import {
	DeserializeFn,
	deserializeToFragment,
	deserializeToLeaf,
	matchHTMLElementNode,
} from './utils';

import {StencylText} from '../../types';
import htmlNodeNames from '../../constants/html-node-names';
import htmlNodeTypes from '../../constants/html-node-types';

export const deserializeBody: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.BLOCKQUOTE})) {
		return deserializeToFragment(children);
	}

	return undefined;
};

export const deserializeLineBreak: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.BR})) {
		return deserializeToLeaf({text: '\n'}, children);
	}

	return undefined;
};

export const deserializeMarks: DeserializeFn = (element, children) => {
	if (!children.length) {
		return deserializeToLeaf({text: element.textContent ?? ''}, null);
	}

	if (
		![
			htmlNodeNames.SPAN,
			htmlNodeNames.STRONG,
			htmlNodeNames.I,
			htmlNodeNames.B,
			htmlNodeNames.U,
			htmlNodeNames.S,
			htmlNodeNames.CODE,
		].includes(element.nodeName) &&
		element.nodeType !== htmlNodeTypes.TEXT_NODE
	) {
		return undefined;
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.SPAN})) {
		return children.map((child) =>
			deserializeToLeaf({text: (child as StencylText).text ?? ''}, child),
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.STRONG})) {
		return children.map((child) =>
			deserializeToLeaf({text: (child as StencylText).text ?? '', bold: true}, child),
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.B})) {
		return children.map((child) =>
			deserializeToLeaf({text: (child as StencylText).text ?? '', bold: true}, child),
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.I})) {
		return children.map((child) =>
			deserializeToLeaf({text: (child as StencylText).text ?? '', italic: true}, child),
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.U})) {
		return children.map((child) =>
			deserializeToLeaf({text: (child as StencylText).text ?? '', underline: true}, child),
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.S})) {
		return children.map((child) =>
			deserializeToLeaf({text: (child as StencylText).text ?? '', strikethrough: true}, child),
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.CODE})) {
		return children.map((child) =>
			deserializeToLeaf({text: (child as StencylText).text ?? '', code: true}, child),
		);
	}

	return undefined;
};
