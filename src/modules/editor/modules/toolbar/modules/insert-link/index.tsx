import React, {Fragment, useRef, useState} from 'react';
import {insertInlineLink, removeInlineLink} from '../../../../../../packages/link/commands';

import {BaseSelection} from 'slate';
import {IconButton} from '../../../icon-button';
import {InsertLinkPopup} from '../../../popups/insert-link';
import {ReactComponent as Link} from '../../../../../../assets/images/icon-link.svg';
import {StencylPopupCoordinates} from '../../../../../../types';
import {focusEditor} from '../../../../../../packages/common/commands';
import {getCurrentInlineLink} from '../../../../../../packages/link/utils';
import {getSelectionCoordinates} from '../../../../../../packages/common/utils';
import {useModalUtils} from '../../../../../../hooks';
import {useSlate} from 'slate-react';

export const InsertLinkButton = () => {
	const selectionRef = useRef<BaseSelection>();
	const ref = useRef(null);
	const editor = useSlate();
	const isActive = !!getCurrentInlineLink(editor);
	const modalUtils = useModalUtils();
	const [coordinates, setCoordinates] = useState<StencylPopupCoordinates>({x: 0, y: 0});

	const handlePressIcon = () => {
		const {selection} = editor;

		if (!selection) {
			return;
		}

		if (isActive) {
			removeInlineLink(editor);
			return;
		}

		selectionRef.current = selection;
		setCoordinates(getSelectionCoordinates(editor));
		modalUtils.open();
	};

	const handleInsertLink = (url: string) => {
		if (!selectionRef.current) {
			return;
		}

		focusEditor(editor, selectionRef.current);

		insertInlineLink(editor, url);
	};

	return (
		<Fragment>
			<IconButton active={isActive} tip='Insert link' onPress={handlePressIcon} ref={ref}>
				<Link />
			</IconButton>
			<InsertLinkPopup
				coordinates={coordinates}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
				onSubmit={handleInsertLink}
			/>
		</Fragment>
	);
};
