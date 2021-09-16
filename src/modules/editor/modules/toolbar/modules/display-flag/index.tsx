import React, {Fragment, useRef, useState} from 'react';
import {StencylDisplayCondition, StencylPopupCoordinates} from '../../../../../../types';
import {getSelectionCoordinates, isMarkActive} from '../../../../../../packages/common/utils';
import {setConditionMark, unsetConditionMark} from '../../../../../../packages/leaf/commands';

import {BaseSelection} from 'slate';
import {DisplayFlagPopup} from '../../../popups/display-flag';
import {IconButton} from '../../../icon-button';
import {ReactComponent as Pennant} from '../../../../../../assets/images/icon-pennant.svg';
import {focusEditor} from '../../../../../../packages/common/commands';
import {useModalUtils} from '../../../../../../hooks';
import {useSlate} from 'slate-react';

export const DisplayFlagButton = () => {
	const selectionRef = useRef<BaseSelection>();
	const ref = useRef(null);
	const editor = useSlate();
	const modalUtils = useModalUtils();
	const isActive = isMarkActive(editor, 'condition');
	const [coordinates, setCoordinates] = useState<StencylPopupCoordinates>({x: 0, y: 0});

	const handlePressIcon = () => {
		const {selection} = editor;

		if (!selection) {
			return;
		}

		if (isActive) {
			unsetConditionMark(editor);
			return;
		}

		selectionRef.current = selection;
		setCoordinates(getSelectionCoordinates(editor));
		modalUtils.open();
	};

	const handleAddCondition = (condition: StencylDisplayCondition) => {
		if (!selectionRef.current) {
			return;
		}

		focusEditor(editor, selectionRef.current);

		setConditionMark(editor, condition);
	};

	return (
		<Fragment>
			<IconButton active={isActive} onPress={handlePressIcon} ref={ref} tip='Display flag'>
				<Pennant />
			</IconButton>
			<DisplayFlagPopup
				coordinates={coordinates}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
				onSubmit={handleAddCondition}
			/>
		</Fragment>
	);
};
