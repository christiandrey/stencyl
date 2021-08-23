import {DeserializeFn, deserializeToElement, matchHTMLElementNode} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeBlockquote: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.BLOCKQUOTE})) {
		return deserializeToElement(
			{
				type: 'block-quote',
			},
			children,
		);
	}

	return undefined;
};
