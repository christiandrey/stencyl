import {
	DeserializeFn,
	deserializeToElement,
	getNodeIndentation,
	getNodeStyle,
	getStencylAlignmentAttribute,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeHeadings: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H1})) {
		return deserializeToElement(
			{
				type: 'heading-one',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H2})) {
		return deserializeToElement(
			{
				type: 'heading-two',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H3})) {
		return deserializeToElement(
			{
				type: 'heading-three',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H4})) {
		return deserializeToElement(
			{
				type: 'heading-four',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H5})) {
		return deserializeToElement(
			{
				type: 'heading-five',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H6})) {
		return deserializeToElement(
			{
				type: 'heading-six',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	return undefined;
};
