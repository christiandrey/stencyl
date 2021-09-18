import React, {Fragment, useRef} from 'react';
import {getCurrentDisplayTextSize, getMarkValue} from '../../../../../../packages/common/utils';

import {ReactComponent as H1} from '../../../../../../assets/images/icon-h-1.svg';
import {ReactComponent as H2} from '../../../../../../assets/images/icon-h-2.svg';
import {ReactComponent as H3} from '../../../../../../assets/images/icon-h-3.svg';
import {IconButton} from '../../../icon-button';
import {ReactComponent as LetterCase} from '../../../../../../assets/images/icon-letter-case.svg';
import {TextStylePopup} from '../../../popups/text-style';
import colors from '../../../../../../constants/colors';
import {getRgbaColor} from '../../../../../../utils';
import {useModalUtils} from '../../../../../../hooks';
import {useSlate} from 'slate-react';

export const TextStyleButton = () => {
	const ref = useRef(null);
	const modalUtils = useModalUtils();
	const editor = useSlate();
	const colorMark = getMarkValue(editor, 'color');
	const textSize = getCurrentDisplayTextSize(editor);

	return (
		<Fragment>
			<IconButton
				onPress={modalUtils.open}
				ref={ref}
				tip='Text style'
				className='transition-shadow hover:shadow-outline'
				style={{
					backgroundColor: getRgbaColor(colorMark ?? colors.black, 0.15),
					color: colorMark ?? colors.black,
				}}
			>
				{textSize === 'heading-one' && <H1 />}
				{textSize === 'heading-two' && <H2 />}
				{textSize === 'heading-three' && <H3 />}
				{!textSize && <LetterCase />}
			</IconButton>
			<TextStylePopup
				anchorRef={ref}
				isVisible={modalUtils.visible}
				onRequestClose={modalUtils.close}
			/>
		</Fragment>
	);
};
