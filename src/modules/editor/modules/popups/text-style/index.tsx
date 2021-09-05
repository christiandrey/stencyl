import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';

import {ReactComponent as ChevronDown} from '../../../../../assets/images/icon-chevron-down.svg';
import Icon from '../../icon';
import {PRESET_COLORS} from '../../../../../constants/colors';
import classNames from 'classnames';
import css from './style.module.css';
import {useBooleanState} from '../../../../../hooks';

type TextStylePopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
};

const BaseTextStylePopup: FC<TextStylePopupProps> = ({anchorRef, isVisible, onRequestClose}) => {
	const [selectorOpen, toggleSelectorOpen] = useBooleanState(false);

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
			contentClassName='bg-white rounded-lg py-16 text-gray-500 divide-y divide-y-gray-100'
			distance={4}
			offsets={{
				y: 16,
			}}
		>
			<div className='pb-8 px-16'>
				<div className='text-blue-500 font-medium'>Style</div>
				<div
					className={classNames(css.selector, {
						[css.open]: selectorOpen,
					})}
				>
					<div
						onClick={() => toggleSelectorOpen()}
						className='h-36 flex items-center space-x-6 transition-colors duration-250 hover:text-gray-900 cursor-pointer'
					>
						<div>Base Paragraph</div>
						<Icon className='s-18'>
							<ChevronDown />
						</Icon>
					</div>
					<div className='h-36 flex items-center space-x-6 transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
						<div className='text-headline'>Heading 3</div>
					</div>
					<div className='h-36 flex items-center space-x-6 transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
						<div className='text-heading-3'>Heading 2</div>
					</div>
					<div className='h-36 flex items-center space-x-6 transition-colors duration-250 hover:text-gray-900 cursor-pointer'>
						<div className='text-heading-2'>Heading 1</div>
					</div>
				</div>
			</div>
			<div className='pt-16 px-16'>
				<div className='text-blue-500 font-medium mb-8'>Color</div>
				<div className='flex items-center space-x-6'>
					{PRESET_COLORS.map((o) => (
						<div
							key={o}
							style={{backgroundColor: o}}
							className='w-20 h-20 rounded-full cursor-pointer duration-250 transition-shadow hover:shadow-outline'
						/>
					))}
				</div>
			</div>
		</Popup>
	);
};

export const TextStylePopup = memo(BaseTextStylePopup);
