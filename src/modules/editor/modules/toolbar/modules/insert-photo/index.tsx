import React, {Fragment, useRef} from 'react';

import {IconButton} from '../../../icon-button';
import {InsertPhotoPopup} from '../../../popups/insert-photo';
import {ReactComponent as Photo} from '../../../../../../assets/images/icon-photo.svg';
import {useModalUtils} from '../../../../../../hooks';

export const InsertPhotoButton = () => {
	const ref = useRef(null);
	const modalUtils = useModalUtils();
	return (
		<Fragment>
			<IconButton tip='Insert photo' onPress={modalUtils.open} ref={ref}>
				<Photo />
			</IconButton>
			<InsertPhotoPopup
				anchorRef={ref}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
			/>
		</Fragment>
	);
};
