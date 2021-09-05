import React, {Fragment, useRef} from 'react';

import {IconButton} from '../../../icon-button';
import {ReactComponent as LetterCase} from '../../../../../../assets/images/icon-letter-case.svg';
import {TextStylePopup} from '../../../popups/text-style';
import {getRgbaColor} from '../../../../../../utils';
import {useModalUtils} from '../../../../../../hooks';

export const TextStyleButton = () => {
	const ref = useRef(null);
	const modalUtils = useModalUtils();

	return (
		<Fragment>
			<IconButton
				onPress={modalUtils.open}
				ref={ref}
				tip='Text style'
				className='transition-shadow hover:shadow-outline'
				style={{
					backgroundColor: getRgbaColor('#000', 0.15),
					color: '#000',
				}}
			>
				<LetterCase />
			</IconButton>
			<TextStylePopup
				anchorRef={ref}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
			/>
		</Fragment>
	);
};
