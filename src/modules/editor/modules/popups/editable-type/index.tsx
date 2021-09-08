import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';

type EditableTypePopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
};

const BaseEditableTypePopup: FC<EditableTypePopupProps> = ({
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
			contentClassName='bg-white rounded-lg py-8 px-16 w-144 text-gray-500'
			distance={4}
			offsets={{
				y: 16,
			}}
		>
			<div className='h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
				<div>Text</div>
			</div>
			<div className='h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
				<div>Image</div>
			</div>
			<div className='h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
				<div>Dropdown</div>
			</div>
			<div className='h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
				<div>Radio</div>
			</div>
			<div className='h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
				<div>Date</div>
			</div>
			<div className='h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
				<div>Time</div>
			</div>
		</Popup>
	);
};

export const EditableTypePopup = memo(BaseEditableTypePopup);
