import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';

import {Button} from '../../button';
import Field from '../../field';

type EditableLabelPopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
};

const BaseEditableLabelPopup: FC<EditableLabelPopupProps> = ({
	anchorRef,
	isVisible,
	onRequestClose,
}) => {
	return (
		<Popup
			position='down'
			alignment='start'
			anchorRef={anchorRef}
			isVisible={isVisible}
			onRequestClose={onRequestClose}
			transparent
			hideArrow
			overlayCloseOnClick
			contentClassName='bg-white rounded-lg flex items-center py-8 px-8 space-x-8 text-gray-500'
			distance={4}
			offsets={{
				y: 16,
			}}
		>
			<Field className='w-320'>
				<input type='text' placeholder='Type a question here...' />
			</Field>
			<Button className='h-36'>Done</Button>
		</Popup>
	);
};

export const EditableLabelPopup = memo(BaseEditableLabelPopup);
