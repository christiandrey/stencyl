import {BaseSelection, Editor, Transforms} from 'slate';
import {DATE_FORMATS, TIME_FORMATS} from '../../../../../../constants/datetime';
import {EditableElement, StencylPopupCoordinates} from '../../../../../../types';
import {EditableTypePopup, InsertEditableType} from '../../../popups/editable-type';
import React, {Fragment, useRef, useState} from 'react';
import {
	insertInlineEditable,
	insertInvisibleEditable,
} from '../../../../../../packages/editable/commands';

import {ReactComponent as EditCircle} from '../../../../../../assets/images/icon-edit-circle.svg';
import {EditableLabelPopup} from '../../../popups/editable-label';
import {ExistingEditablePopup} from '../../../popups/existing-editable';
import {IconButton} from '../../../icon-button';
import {createEditableElement} from '../../../../../../packages/editable/utils';
import {focusEditor} from '../../../../../../packages/common/commands';
import {getSelectionCoordinates} from '../../../../../../packages/common/utils';
import {useModalUtils} from '../../../../../../hooks';
import {useSlateStatic} from 'slate-react';

export const InsertEditableButton = () => {
	const selectionRef = useRef<BaseSelection>();
	const ref = useRef(null);
	const editor = useSlateStatic();
	const editableTypeModalUtils = useModalUtils();
	const editableLabelModalUtils = useModalUtils();
	const existingEditableModalUtils = useModalUtils();
	const [editableType, setEditableType] = useState<InsertEditableType>();
	const [selectedText, setSelectedText] = useState('');
	const [coordinates, setCoordinates] = useState<StencylPopupCoordinates>({x: 0, y: 0});

	const handlePressIcon = () => {
		const {selection} = editor;

		if (!selection) {
			return;
		}

		selectionRef.current = selection;

		setCoordinates(getSelectionCoordinates(editor));
		setSelectedText(Editor.string(editor, selection));
		editableTypeModalUtils.open();
	};

	const handleSelectEditableType = (value: InsertEditableType) => {
		setEditableType(value);

		Transforms.select(editor, selectionRef.current!);

		if (value === 'existing') {
			existingEditableModalUtils.open();
			return;
		}

		editableLabelModalUtils.open();
	};

	const handleInsertEditable = (value: string) => {
		let editable: EditableElement;

		switch (editableType) {
			case 'question':
				editable = createEditableElement(editor, {
					dataType: 'options',
					defaultValue: '',
					label: value,
					options: [],
					isInvisible: true,
				});
				break;
			case 'options':
			case 'radio':
				editable = createEditableElement(editor, {
					dataType: editableType,
					defaultValue: selectedText,
					label: value,
					options: [],
				});
				break;
			case 'date':
			case 'time':
				editable = createEditableElement(editor, {
					dataType: editableType,
					defaultValue: selectedText,
					label: value,
					dateTimeFormat: editableType === 'date' ? DATE_FORMATS[0] : TIME_FORMATS[0],
				});
				break;
			case 'image':
				editable = createEditableElement(editor, {
					dataType: 'image',
					defaultValue: selectedText,
					label: value,
					width: 100,
					height: 100,
				});
				break;
			default:
				editable = createEditableElement(editor, {
					dataType: 'text',
					defaultValue: selectedText,
					label: value,
				});
		}

		focusEditor(editor, selectionRef.current ?? undefined);

		editableType === 'question'
			? insertInvisibleEditable(editor, editable)
			: insertInlineEditable(editor, editable);
	};

	const handleInsertExistingEditable = (value: EditableElement) => {
		const editable = createEditableElement(editor, {
			dataType: value.dataType as any,
			label: '',
			defaultValue: '',
			linkId: value.id,
		});

		focusEditor(editor, selectionRef.current ?? undefined);

		insertInlineEditable(editor, editable);
	};

	return (
		<Fragment>
			<IconButton tip='Insert editable...' onPress={handlePressIcon} ref={ref}>
				<EditCircle />
			</IconButton>
			<EditableTypePopup
				anchorRef={ref}
				isVisible={editableTypeModalUtils.visible}
				onRequestClose={editableTypeModalUtils.close}
				onSelect={handleSelectEditableType}
			/>
			<EditableLabelPopup
				coordinates={coordinates}
				isVisible={editableLabelModalUtils.visible}
				onRequestClose={editableLabelModalUtils.close}
				onSubmit={handleInsertEditable}
			/>
			<ExistingEditablePopup
				coordinates={coordinates}
				isVisible={existingEditableModalUtils.visible}
				onRequestClose={existingEditableModalUtils.close}
				onSelect={handleInsertExistingEditable}
			/>
		</Fragment>
	);
};
