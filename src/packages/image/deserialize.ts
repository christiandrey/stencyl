import {
	DeserializeFn,
	deserializeToElement,
	getNodeAttribute,
	getNodeStyle,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';
import {runIfDefined} from '../../utils';

export const deserializeImage: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.IMG})) {
		return deserializeToElement(
			{
				type: 'image',
				url: getNodeAttribute(element, 'src'),
				width: runIfDefined(
					getNodeAttribute(element, 'width') ?? getNodeStyle(element, 'width'),
					(o) => parseFloat(o),
				),
				height: runIfDefined(
					getNodeAttribute(element, 'height') ?? getNodeStyle(element, 'height'),
					(o) => parseFloat(o),
				),
			},
			children,
		);
	}

	return undefined;
};
