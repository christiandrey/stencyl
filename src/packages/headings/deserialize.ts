import {
	DeserializeFn,
	deserializeToElement,
	getNodeIndentationFromDeclaration,
	getStencylAlignmentAttribute,
	getStyleDeclaration,
	matchHTMLElementNode,
} from '../deserialize/utils';

import htmlNodeNames from '../../constants/html-node-names';

export const deserializeHeadings: DeserializeFn = (element, children, styles) => {
	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H1})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'heading-one',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H2})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'heading-two',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H3})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'heading-three',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H4})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'heading-four',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H5})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'heading-five',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	if (matchHTMLElementNode(element, {nodeName: htmlNodeNames.H6})) {
		const declaration = getStyleDeclaration(element, styles);
		return deserializeToElement(
			{
				type: 'heading-six',
				alignment: getStencylAlignmentAttribute(declaration.textAlign),
				indentation: getNodeIndentationFromDeclaration(declaration),
			},
			children,
		);
	}

	return null;
};
