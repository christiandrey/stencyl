import {BaseEditor, Descendant} from 'slate';

import {HistoryEditor} from 'slate-history';
import {ReactEditor} from 'slate-react';

export type StencylDisplayCondition = {
	parent: string;
	value: string;
};

export type StencylOption = {
	id: string;
	label: string;
};

export type StencylAlignment = 'left' | 'center' | 'right' | 'justify';

export type BlockQuoteElement = {
	type: 'block-quote';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type BulletedListElement = {
	type: 'bulleted-list';
	children: Descendant[];
};

export type CodeBlockElement = {
	type: 'code-block';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type HeadingOneElement = {
	type: 'heading-one';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type HeadingTwoElement = {
	type: 'heading-two';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type HeadingThreeElement = {
	type: 'heading-three';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type HeadingFourElement = {
	type: 'heading-four';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type HeadingFiveElement = {
	type: 'heading-five';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type HeadingSixElement = {
	type: 'heading-six';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type ImageElement = {
	type: 'image';
	url: string;
	width?: number;
	height?: number;
	children: EmptyText[];
};

export type LinkElement = {
	type: 'link';
	url: string;
	children: Descendant[];
};

export type ListItemElement = {
	type: 'list-item';
	children: Descendant[];
};

export type NumberedListElement = {
	type: 'numbered-list';
	children: Descendant[];
};

export type ParagraphElement = {
	type: 'paragraph';
	alignment?: StencylAlignment;
	indentation?: number;
	children: Descendant[];
};

export type TableElement = {
	type: 'table';
	children: TableRowElement[];
};

export type TableCellElement = {
	type: 'table-cell';
	width: number;
	height: number;
	colspan?: number;
	rowspan?: number;
	borderColor?: string;
	borderWidth?: number;
	children: StencylText[];
};

export type TableRowElement = {
	type: 'table-row';
	children: TableCellElement[];
};

export type BaseEditableElement = {
	type: 'editable';
	id: string;
	defaultValue: string;
	label: string;
	editable: boolean;
	isOrphan?: boolean;
	tip?: string;
	children: EmptyText[];
	/**
	 * Allows to check if the text/element should be displayed.
	 * When it's a single condition, the value of the node represented by
	 * condition.id must be equal to condition.value. When it's an array,
	 * all conditions in the list must pass.
	 */
	condition?: StencylDisplayCondition | Array<StencylDisplayCondition>;
	/**
	 * The id of a node to copy this one's values from.
	 */
	linkId?: string;
};

export type EditableTextElement = {
	dataType: 'text';
	multiline?: boolean;
};

export type EditableOptionsElement = {
	dataType: 'options';
	options: Array<StencylOption>;
};

export type EditableRadioElement = {
	dataType: 'radio';
	options: Array<StencylOption>;
};

export type EditableTimeElement = {
	dataType: 'radio';
	dateTimeFormat: string;
};

export type EditableDateElement = {
	dataType: 'radio';
	dateTimeFormat: string;
};

export type EditableImageElement = {
	dataType: 'image';
	width: number;
	height: number;
};

export type EditableElement = BaseEditableElement &
	(
		| EditableTextElement
		| EditableOptionsElement
		| EditableRadioElement
		| EditableTimeElement
		| EditableDateElement
		| EditableImageElement
	);

export type StencylText = {
	bold?: boolean;
	code?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	color?: string;
	/**
	 * Allows to check if the text/element should be displayed.
	 * When it's a single condition, the value of the node represented by
	 * condition.id must be equal to condition.value. When it's an array,
	 * all conditions in the list must pass.
	 */
	condition?: StencylDisplayCondition | Array<StencylDisplayCondition>;
	text: string;
};

export type StencylElement =
	| BlockQuoteElement
	| BulletedListElement
	| CodeBlockElement
	| HeadingOneElement
	| HeadingTwoElement
	| HeadingThreeElement
	| HeadingFourElement
	| HeadingFiveElement
	| HeadingSixElement
	| ImageElement
	| LinkElement
	| ListItemElement
	| NumberedListElement
	| ParagraphElement
	| TableElement
	| TableCellElement
	| TableRowElement
	| EditableElement;

export type EmptyText = {
	text: string;
};

export type StencylEditor = BaseEditor & ReactEditor & HistoryEditor;

export type StencylData = {
	nodes: Descendant[];
	orphans: Descendant[];
};

declare module 'slate' {
	interface CustomTypes {
		Editor: StencylEditor;
		Element: StencylElement;
		Text: StencylText & EmptyText;
	}
}
