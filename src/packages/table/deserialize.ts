import {
	DeserializeFn,
	deserializeToElement,
	getNodeAttribute,
	getNodeStyle,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';
import {runIfDefined} from '../../utils';

export const deserializeTable: DeserializeFn = (element, children) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.TD})) {
		return deserializeToElement(
			{
				type: 'table-cell',
				colspan: runIfDefined(getNodeAttribute(element, 'colspan'), (o) => parseInt(o)),
				rowspan: runIfDefined(getNodeAttribute(element, 'rowspan'), (o) => parseInt(o)),
				width: runIfDefined(getNodeStyle(element, 'width'), (o) => parseFloat(o)),
				height: runIfDefined(getNodeStyle(element, 'height'), (o) => parseFloat(o)),
				borderColor: getNodeStyle(element, 'borderColor'),
				borderWidth: runIfDefined(getNodeStyle(element, 'borderWidth'), (o) => {
					const parsed = parseFloat(o);
					return !parsed || isNaN(parsed) ? 1 : parsed;
				}),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.TH})) {
		return deserializeToElement(
			{
				type: 'table-row',
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.TR})) {
		return deserializeToElement(
			{
				type: 'table-row',
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.TABLE})) {
		return deserializeToElement(
			{
				type: 'table',
			},
			children,
		);
	}

	return undefined;
};
