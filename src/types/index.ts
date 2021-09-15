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

export type StencylPopupCoordinates = {
	x: number;
	y: number;
};

export type StencylAlignment = 'left' | 'center' | 'right' | 'justify';

export type StencylMarks = {
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
};

export type AlignableElement = {
	alignment?: StencylAlignment;
};

export type IndentableElement = {
	indentation?: number;
};

export type BlockQuoteElement = {
	type: 'block-quote';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type BulletedListElement = {
	type: 'bulleted-list';
	children: Descendant[];
} & IndentableElement;

export type CodeBlockElement = {
	type: 'code-block';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type HeadingOneElement = {
	type: 'heading-one';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type HeadingTwoElement = {
	type: 'heading-two';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type HeadingThreeElement = {
	type: 'heading-three';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type HeadingFourElement = {
	type: 'heading-four';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type HeadingFiveElement = {
	type: 'heading-five';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type HeadingSixElement = {
	type: 'heading-six';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

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

export type ListItemContainerElement = {
	type: 'list-item-container';
	children: Descendant[];
};

export type NumberedListElement = {
	type: 'numbered-list';
	children: Descendant[];
} & IndentableElement;

export type ParagraphElement = {
	type: 'paragraph';
	children: Descendant[];
} & AlignableElement &
	IndentableElement;

export type TableElement = {
	type: 'table';
	children: TableRowElement[];
};

export type TableCellElement = {
	type: 'table-cell';
	width?: number;
	height?: number;
	colspan?: number;
	rowspan?: number;
	borderColor?: string;
	borderWidth?: number;
	children: Descendant[];
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
	isInvisible?: boolean;
	tip?: string;
	children: EmptyText[];
	marks: StencylMarks;
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
	dataType: 'time';
	dateTimeFormat: string;
};

export type EditableDateElement = {
	dataType: 'date';
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
	text: string;
} & StencylMarks;

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
	| ListItemContainerElement
	| NumberedListElement
	| ParagraphElement
	| TableElement
	| TableCellElement
	| TableRowElement
	| EditableElement;

export type EmptyText = {
	text: string;
};

export type StencylElementTypes = StencylElement['type'];

export type StencylEditableElementTypes = EditableElement['dataType'];

export type StencylEditor = BaseEditor & ReactEditor & HistoryEditor;

export type StencylDisplayTextSize = 'heading-one' | 'heading-two' | 'heading-three';

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
