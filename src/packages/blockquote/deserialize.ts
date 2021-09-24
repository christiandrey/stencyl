import {
	DeserializeFn,
	deserializeToElement,
	getNodeIndentationFromDeclaration,
	getStencylAlignmentAttribute,
	getStyleDeclaration,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeBlockquote: DeserializeFn = (element, children, styles) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.BLOCKQUOTE})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'block-quote',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	return null;
};
