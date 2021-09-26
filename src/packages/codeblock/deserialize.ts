import {
	DeserializeFn,
	deserializeToElement,
	getNodeIndentationFromDeclaration,
	getStencylAlignmentAttribute,
	getStyleDeclaration,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeCodeblock: DeserializeFn = (element, children, styles) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.PRE})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'code-block',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	return null;
};
