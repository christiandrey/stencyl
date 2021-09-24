import {
	DeserializeFn,
	deserializeToElement,
	getNodeIndentationFromDeclaration,
	getStencylAlignmentAttribute,
	getStyleDeclaration,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';
import htmlNodeTypes from '../../constants/html-node-types';

export const deserializeParagraph: DeserializeFn = (element, children, styles) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.P})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'paragraph',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.DIV})) {
		if (element.firstChild?.nodeType !== htmlNodeTypes.TEXT_NODE) {
			return null;
		}

		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'paragraph',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	return null;
};
