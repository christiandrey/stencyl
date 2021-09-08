import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';

import {Button} from '../../button';
import Field from '../../field';
import Icon from '../../icon';
import {ReactComponent as Photo} from '../../../../../assets/images/icon-photo.svg';

type InsertPhotoPopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
};

const BaseInsertPhotoPopup: FC<InsertPhotoPopupProps> = ({
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
			<Icon className='s-20'>
				<Photo />
			</Icon>
			<div className='flex items-center space-x-4'>
				<Field className='w-180'>
					<input type='text' placeholder='Paste a link to an image' />
				</Field>
				<Field className='w-80'>
					<input type='number' min={0} maxLength={3} placeholder='100%' />
				</Field>
			</div>
			<Button className='h-36'>Insert</Button>
		</Popup>
	);
};

export const InsertPhotoPopup = memo(BaseInsertPhotoPopup);
