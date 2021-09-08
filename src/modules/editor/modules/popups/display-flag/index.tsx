import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';

import {Button} from '../../button';
import Field from '../../field';

type DisplayFlagPopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
};

const BaseDisplayFlagPopup: FC<DisplayFlagPopupProps> = ({
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
			<div className='flex items-center space-x-4'>
				<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
					When
				</div>
				<Field className='w-180'>
					<select>
						<option hidden value=''>
							Choose one
						</option>
					</select>
				</Field>
			</div>
			<div className='flex items-center space-x-4'>
				<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
					Equals
				</div>
				<Field className='w-144'>
					<select>
						<option hidden value=''>
							Choose one
						</option>
					</select>
				</Field>
			</div>
			<Button className='h-36'>Done</Button>
		</Popup>
	);
};

export const DisplayFlagPopup = memo(BaseDisplayFlagPopup);
