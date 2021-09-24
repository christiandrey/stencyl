import {
	DeserializeFn,
	deserializeToFragment,
	deserializeToLeaf,
	getMarksFromStyleDeclaration,
	getNodeTextContent,
	getStyleDeclaration,
	matchHTMLElementNode,
} from './utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeBody: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.BODY})) {
		return deserializeToFragment(children) as any;
	}

	return null;
};

export const deserializeLineBreak: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.BR})) {
		return deserializeToLeaf({text: '\n'}, children);
	}

	return null;
};

export const deserializeMark: DeserializeFn = (element, _children, styles) => {
	if (!(element instanceof HTMLElement)) {
		return null;
	}

	const marks = getMarksFromStyleDeclaration(getStyleDeclaration(element, styles));

	marks.bold =
		marks.bold ||
		matchHTMLElementNode(element, {nodeName: htmlNodeNames.STRONG}) ||
		matchHTMLElementNode(element, {nodeName: htmlNodeNames.B});
	marks.italic = marks.italic || matchHTMLElementNode(element, {nodeName: htmlNodeNames.I});
	marks.underline = marks.underline || matchHTMLElementNode(element, {nodeName: htmlNodeNames.U});
	marks.strikethrough =
		marks.strikethrough || matchHTMLElementNode(element, {nodeName: htmlNodeNames.S});
	marks.code = matchHTMLElementNode(element, {nodeName: htmlNodeNames.CODE});
	marks.color = marks.color?.length ? marks.color : undefined;

	return deserializeToLeaf({
		text: getNodeTextContent(element),
		...marks,
	});
};
