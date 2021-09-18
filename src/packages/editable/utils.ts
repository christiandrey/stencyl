import {
	BaseEditableElement,
	EditableDateElement,
	EditableElement,
	EditableImageElement,
	EditableOptionsElement,
	EditableRadioElement,
	EditableTextElement,
	EditableTimeElement,
	StencylEditor,
	StencylElement,
} from '../../types';
import {Editor, Element, NodeEntry} from 'slate';
import {getEmptyTextNode, isEditableElement} from '../common/utils';

import {generateUUID} from '../../utils';

type EditableElementOptions = Omit<
	BaseEditableElement,
	'type' | 'id' | 'children' | 'editable' | 'marks'
> &
	(
		| EditableTextElement
		| EditableOptionsElement
		| EditableRadioElement
		| EditableTimeElement
		| EditableDateElement
		| EditableImageElement
	);

let EDITABLE_ELEMENTS_CACHE: Array<NodeEntry<EditableElement>> = [];
let EDITABLE_ELEMENTS_CACHED: boolean = false;

export function createEditableElement(editor: StencylEditor, attributes: EditableElementOptions) {
	return {
		...attributes,
		type: 'editable',
		id: generateUUID(),
		children: getEmptyTextNode(),
		editable: true,
		marks: Editor.marks(editor) ?? {},
	} as EditableElement;
}

export function getCurrentEditableElement(editor: StencylEditor) {
	const [editableEntry] = Editor.nodes(editor, {
		match: (node) =>
			Element.isElement(node) && Editor.isVoid(editor, node) && node.type === 'editable',
		mode: 'lowest',
		voids: true,
	});

	if (!editableEntry) {
		return null;
	}

	return editableEntry;
}

export function getAllEditableElements(editor: StencylEditor) {
	if (EDITABLE_ELEMENTS_CACHED) {
		return EDITABLE_ELEMENTS_CACHE;
	}

	const matches = Editor.nodes<EditableElement>(editor, {
		at: [],
		match: (node) => isEditableElement(editor, node) && !node.linkId && !node.isInvisible,
		mode: 'all',
	});

	const editableElements = Array.from(matches);

	cacheEditableElements(editableElements);

	return editableElements;
}

function cacheEditableElements(editableElements: Array<NodeEntry<EditableElement>>) {
	EDITABLE_ELEMENTS_CACHE = editableElements;
	EDITABLE_ELEMENTS_CACHED = true;
}

export function invalidateEditableElementsCache() {
	EDITABLE_ELEMENTS_CACHED = false;
}

export function getEditableElementAttributes(element: StencylElement) {
	if (element.type !== 'editable' || !element.linkId) {
		return element;
	}

	const editableElements = EDITABLE_ELEMENTS_CACHE.map((o) => o[0] as EditableElement);
	const parent = editableElements.find((o) => o.id === element.linkId);

	if (!parent) {
		return element;
	}

	return {...parent, id: element.id, marks: element.marks};
}
