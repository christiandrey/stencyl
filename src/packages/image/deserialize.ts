import {
	DeserializeFn,
	deserializeToElement,
	getNodeAttribute,
	getStyleDeclaration,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';
import {runIfDefined} from '../../utils';

export const deserializeImage: DeserializeFn = (element, children, styles) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.IMG})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'image',
				url: getNodeAttribute(element, 'src'),
				width: runIfDefined(getNodeAttribute(element, 'width') ?? declaration.width, (o) =>
					parseFloat(o),
				),
				height: runIfDefined(getNodeAttribute(element, 'height') ?? declaration.height, (o) =>
					parseFloat(o),
				),
			},
			children,
		);
	}

	return null;
};
