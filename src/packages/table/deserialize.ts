import {
	DeserializeFn,
	deserializeToElement,
	getNodeAttribute,
	getStyleDeclaration,
	matchHTMLElementNode,
} from '../deserialize/utils';
import {parseNumber, runIfDefined} from '../../utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeTable: DeserializeFn = (element, children, styles) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.TD})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'table-cell',
				colspan: runIfDefined(getNodeAttribute(element, 'colspan'), (o) => parseInt(o)),
				rowspan: runIfDefined(getNodeAttribute(element, 'rowspan'), (o) => parseInt(o)),
				width: runIfDefined(declaration.width, (o) => parseNumber(o)),
				height: runIfDefined(declaration.height, (o) => parseNumber(o)),
				borderColor: declaration.borderColor?.length ? declaration.borderColor : undefined,
				borderWidth: runIfDefined(declaration.borderWidth, (o) => {
					const parsed = parseNumber(o, 1);
					return !parsed ? 1 : parsed;
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

	return null;
};
