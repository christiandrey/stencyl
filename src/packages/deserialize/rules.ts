import {
	DeserializeFn,
	deserializeToFragment,
	deserializeToLeaf,
	matchHTMLElementNode,
} from './utils';

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
	if (
		![
			htmlNodeNames.SPAN,
			htmlNodeNames.STRONG,
			htmlNodeNames.I,
			htmlNodeNames.B,
			htmlNodeNames.U,
			htmlNodeNames.S,
			htmlNodeNames.CODE,
			htmlNodeNames.FONT,
		].includes(element.nodeName) &&
		element.nodeType !== htmlNodeTypes.TEXT_NODE
	) {
		return undefined;
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.SPAN})) {
		return children;
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.FONT})) {
		return children;
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.STRONG})) {
		return children.map((child) => ({...child, bold: true}));
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.B})) {
		return children.map((child) => ({...child, bold: true}));
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.I})) {
		return children.map((child) => ({...child, italic: true}));
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.U})) {
		return children.map((child) => ({...child, underline: true}));
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.S})) {
		return children.map((child) => ({...child, strikethrough: true}));
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.CODE})) {
		return children.map((child) => ({...child, code: true}));
	}

	return undefined;
};
