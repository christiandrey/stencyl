import {
	DeserializeFn,
	deserializeToElement,
	getNodeIndentation,
	getNodeStyle,
	getStencylAlignmentAttribute,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeParagraph: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.P})) {
		return deserializeToElement(
			{
				type: 'paragraph',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.DIV})) {
		return deserializeToElement(
			{
				type: 'paragraph',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	return undefined;
};
