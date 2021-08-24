import {
	DeserializeFn,
	deserializeToElement,
	getNodeIndentation,
	getNodeStyle,
	getStencylAlignmentAttribute,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeCodeblock: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.PRE})) {
		return deserializeToElement(
			{
				type: 'code-block',
				alignment: getStencylAlignmentAttribute(getNodeStyle(element, 'textAlign')),
				indentation: getNodeIndentation(element),
			},
			children,
		);
	}

	return undefined;
};
