import {DeserializeFn, deserializeToElement, matchHTMLElementNode} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeParagraph: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.P})) {
		return deserializeToElement(
			{
				type: 'paragraph',
			},
			children,
		);
	}

	return undefined;
};
