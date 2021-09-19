import {
	EditableDateElement,
	EditableElement,
	EditableImageElement,
	EditableOptionsElement,
	EditableTextElement,
	StencylEditor,
} from '../../types';
import {Element, Node, NodeEntry, Transforms} from 'slate';
import {getCurrentEditableElement, invalidateEditableElementsCache} from './utils';

export function insertInlineEditable(editor: StencylEditor, element: EditableElement) {
	Transforms.insertNodes(editor, element, {voids: false});
	invalidateEditableElementsCache();
}

export function insertInvisibleEditable(editor: StencylEditor, element: EditableElement) {
	Transforms.insertNodes(editor, element);
	invalidateEditableElementsCache();
}

export function updateInlineEditable(
	editor: StencylEditor,
	attributes: Partial<EditableElement> = {},
	editableEntry?: NodeEntry<Node>,
) {
	editableEntry = editableEntry ?? getCurrentEditableElement(editor) ?? undefined;

	if (!editableEntry) {
		return;
	}

	const [editableNode, editablePath] = editableEntry;

	if (!Element.isElement(editableNode) || editableNode.type !== 'editable') {
		return;
	}

	Transforms.setNodes(
		editor,
		{
			defaultValue: attributes.defaultValue ?? editableNode.defaultValue,
			label: attributes.label ?? editableNode.label,
			tip: attributes.tip,
			linkId: attributes.linkId ?? editableNode.linkId,
			multiline:
				editableNode.dataType === 'text'
					? (attributes as EditableTextElement).multiline ?? editableNode.multiline
					: undefined,
			options:
				editableNode.dataType === 'options' || editableNode.dataType === 'radio'
					? (attributes as EditableOptionsElement).options ?? editableNode.options
					: undefined,
			dateTimeFormat:
				editableNode.dataType === 'date' || editableNode.dataType === 'time'
					? (attributes as EditableDateElement).dateTimeFormat ?? editableNode.dateTimeFormat
					: undefined,
			width:
				editableNode.dataType === 'image'
					? (attributes as EditableImageElement).width ?? editableNode.width
					: undefined,
			height:
				editableNode.dataType === 'image'
					? (attributes as EditableImageElement).height ?? editableNode.height
					: undefined,
		},
		{at: editablePath, hanging: true, voids: true},
	);

	invalidateEditableElementsCache();
}
