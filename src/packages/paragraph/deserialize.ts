import {
	DeserializeFn,
	cruftFilterFn,
	deserializeToElement,
	getNodeIndentationFromDeclaration,
	getStencylAlignmentAttribute,
	getStyleDeclaration,
	invalidNodesFilterFn,
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
		const firstChild = Array.from(element.childNodes)
			.filter(cruftFilterFn)
			.filter(invalidNodesFilterFn)[0];
		if (firstChild?.nodeType !== htmlNodeTypes.TEXT_NODE) {
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
