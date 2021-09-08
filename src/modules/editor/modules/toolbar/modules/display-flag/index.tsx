import React, {Fragment, useRef} from 'react';

import {DisplayFlagPopup} from '../../../popups/display-flag';
import {IconButton} from '../../../icon-button';
import {ReactComponent as Pennant} from '../../../../../../assets/images/icon-pennant.svg';
import {useModalUtils} from '../../../../../../hooks';

export const DisplayFlagButton = () => {
	const ref = useRef(null);
	const modalUtils = useModalUtils();
	return (
		<Fragment>
			<IconButton onPress={modalUtils.open} ref={ref} tip='Display flag'>
				<Pennant />
			</IconButton>
			<DisplayFlagPopup
				anchorRef={ref}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
			/>
		</Fragment>
	);
};
