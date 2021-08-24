import {DeserializeFn, deserializeToElement, matchHTMLElementNode} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeLists: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.LI})) {
		return deserializeToElement(
			{
				type: 'list-item',
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.UL})) {
		return deserializeToElement(
			{
				type: 'bulleted-list',
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.OL})) {
		return deserializeToElement(
			{
				type: 'numbered-list',
			},
			children,
		);
	}

	return undefined;
};
