import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';

import Icon from '../../icon';
import {ReactComponent as ListSearch} from '../../../../../assets/images/icon-list-search.svg';

type ExistingEditablePopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
};

const BaseExistingEditablePopup: FC<ExistingEditablePopupProps> = ({
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
			contentClassName='bg-white rounded-lg w-200 text-gray-500'
			distance={4}
			offsets={{
				y: 16,
			}}
		>
			<div className='p-8'>
				<div className='flex items-center justify-between px-8 h-36 w-full border border-gray-200 rounded-lg transition:colors transition:shadow duration-250 focus-within:shadow-outline focus-within:border-blue-500'>
					<input
						type='text'
						className='border-none h-full w-full bg-transparent m-0'
						placeholder='Search...'
					/>
					<Icon className='text-gray-500'>
						<ListSearch />
					</Icon>
				</div>
			</div>
			<div className='pb-8'>
				<div className='px-8 h-28 flex items-center cursor-pointer bg-transparent transition-colors duration-250 hover:bg-gray-100'>
					<span
						style={{fontSize: '0.82em'}}
						className='inline-block text-white font-medium px-4 rounded-default mx-1 bg-blue-500'
					>
						Hello world
					</span>
				</div>
				<div className='px-8 h-28 flex items-center cursor-pointer bg-transparent transition-colors duration-250 hover:bg-gray-100'>
					<span
						style={{fontSize: '0.82em'}}
						className='inline-block text-white font-medium px-4 rounded-default mx-1 bg-blue-500'
					>
						Hello world
					</span>
				</div>
			</div>
		</Popup>
	);
};

export const ExistingEditablePopup = memo(BaseExistingEditablePopup);
