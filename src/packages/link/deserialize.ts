import {
	DeserializeFn,
	deserializeToElement,
	getNodeAttribute,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeLink: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.A})) {
		return deserializeToElement(
			{
				type: 'link',
				url: getNodeAttribute(element, 'href'),
			},
			children,
		);
	}

	return null;
};
