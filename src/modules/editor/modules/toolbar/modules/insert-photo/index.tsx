import {ImageInsertOptions, insertInlineImage} from '../../../../../../packages/image/commands';
import React, {Fragment, useRef, useState} from 'react';

import {BaseSelection} from 'slate';
import {IconButton} from '../../../icon-button';
import {InsertPhotoPopup} from '../../../popups/insert-photo';
import {ReactComponent as Photo} from '../../../../../../assets/images/icon-photo.svg';
import {StencylPopupCoordinates} from '../../../../../../types';
import {focusEditor} from '../../../../../../packages/common/commands';
import {getSelectionCoordinates} from '../../../../../../packages/common/utils';
import {useModalUtils} from '../../../../../../hooks';
import {useSlateStatic} from 'slate-react';

export const InsertPhotoButton = () => {
	const selectionRef = useRef<BaseSelection>();
	const ref = useRef(null);
	const editor = useSlateStatic();
	const modalUtils = useModalUtils();
	const [coordinates, setCoordinates] = useState<StencylPopupCoordinates>({x: 0, y: 0});

	const handlePressIcon = () => {
		const {selection} = editor;

		if (!selection) {
			return;
		}

		selectionRef.current = selection;
		setCoordinates(getSelectionCoordinates(editor));
		modalUtils.open();
	};

	const handleInsertImage = (options: ImageInsertOptions) => {
		if (!selectionRef.current) {
			return;
		}

		focusEditor(editor, selectionRef.current);

		insertInlineImage(editor, options);
	};

	return (
		<Fragment>
			<IconButton tip='Insert photo' onPress={handlePressIcon} ref={ref}>
				<Photo />
			</IconButton>
			<InsertPhotoPopup
				coordinates={coordinates}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
				onSubmit={handleInsertImage}
			/>
		</Fragment>
	);
};
