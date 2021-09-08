import React, {Fragment, useRef} from 'react';

import {ReactComponent as EditCircle} from '../../../../../../assets/images/icon-edit-circle.svg';
import {EditableTypePopup} from '../../../popups/editable-type';
import {IconButton} from '../../../icon-button';
import {useModalUtils} from '../../../../../../hooks';

export const InsertEditableButton = () => {
	const ref = useRef(null);
	const modalUtils = useModalUtils();

	return (
		<Fragment>
			<IconButton tip='Insert editable...' onPress={modalUtils.open} ref={ref}>
				<EditCircle />
			</IconButton>
			<EditableTypePopup
				anchorRef={ref}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
			/>
		</Fragment>
	);
};
