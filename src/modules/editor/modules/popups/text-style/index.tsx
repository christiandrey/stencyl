import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';
import colors, {PRESET_COLORS} from '../../../../../constants/colors';
import {getCurrentDisplayTextSize, getMarkValue} from '../../../../../packages/common/utils';
import {setColorMark, unsetColorMark} from '../../../../../packages/leaf/commands';
import {
	toggleHeadingOne,
	toggleHeadingThree,
	toggleHeadingTwo,
} from '../../../../../packages/headings/commands';
import {useBooleanState, useMouseDown} from '../../../../../hooks';

import {ReactComponent as ChevronDown} from '../../../../../assets/images/icon-chevron-down.svg';
import Icon from '../../icon';
import {StencylDisplayTextSize} from '../../../../../types';
import classNames from 'classnames';
import css from './style.module.css';
import {isEqualColor} from '../../../../../utils';
import {setBlockAsParagraph} from '../../../../../packages/paragraph/commands';
import {useSlate} from 'slate-react';

type TextStylePopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
};

type ColorItemProps = {
	selected?: boolean;
	color?: string;
	onPress?: (color?: string) => void;
};

type TextSizeItemProps = {
	textSize?: StencylDisplayTextSize;
	label: string;
	onPress?: (textSize?: StencylDisplayTextSize) => void;
};

const ColorItem: FC<ColorItemProps> = ({color, selected, onPress}) => {
	const handleMouseDown = useMouseDown(() => {
		onPress?.(color);
	});

	return (
		<div
			onMouseDown={handleMouseDown}
			style={{backgroundColor: color ?? colors.black}}
			className={classNames(
				'st-w-20 st-h-20 st-rounded-full st-cursor-pointer st-duration-250 st-transition-shadow hover:st-shadow-outline',
				{
					'st-shadow-outline': selected,
				},
			)}
		/>
	);
};

const TextSizeItem: FC<TextSizeItemProps> = ({textSize, label, onPress}) => {
	const handleMouseDown = useMouseDown(() => {
		onPress?.(textSize);
	});

	return (
		<div
			onMouseDown={handleMouseDown}
			className='st-h-36 st-flex st-items-center st-transition-colors st-duration-250 hover:st-text-gray-900 st-cursor-pointer'
		>
			<div
				className={classNames({
					'st-text-headline': textSize === 'heading-three',
					'st-text-heading-3': textSize === 'heading-two',
					'st-text-heading-2': textSize === 'heading-one',
				})}
			>
				{label}
			</div>
		</div>
	);
};

const BaseTextStylePopup: FC<TextStylePopupProps> = ({anchorRef, isVisible, onRequestClose}) => {
	const editor = useSlate();
	const colorMark = getMarkValue(editor, 'color');
	const textSize = getCurrentDisplayTextSize(editor);
	const [selectorOpen, toggleSelectorOpen] = useBooleanState(false);

	const handleClickSelector = useMouseDown(() => {
		toggleSelectorOpen();
	});

	const handleClickTextSizeOption = (option?: StencylDisplayTextSize) => {
		if (!option) {
			setBlockAsParagraph(editor);
		}

		if (option === 'heading-one') {
			toggleHeadingOne(editor);
		}

		if (option === 'heading-two') {
			toggleHeadingTwo(editor);
		}

		if (option === 'heading-three') {
			toggleHeadingThree(editor);
		}

		toggleSelectorOpen();
	};

	const handleClickColorOption = (color?: string) => {
		if (!color) {
			unsetColorMark(editor);
			return;
		}

		setColorMark(editor, color);
	};

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
			contentClassName='st-bg-white st-rounded-lg st-py-16 st-text-gray-500 st-divide-y st-divide-y-gray-100'
			distance={4}
			offsets={{
				y: 16,
			}}
		>
			<div className='st-pb-8 st-px-16'>
				<div className='st-text-blue-500 st-font-medium'>Style</div>
				<div
					className={classNames(css.selector, {
						[css.open]: selectorOpen,
					})}
				>
					<div
						onMouseDown={handleClickSelector}
						className='st-h-36 st-flex st-items-center st-space-x-6 st-transition-colors st-duration-250 hover:st-text-gray-900 st-cursor-pointer'
					>
						<div>
							{!textSize && 'Base Paragraph'}
							{textSize === 'heading-one' && 'Heading 1'}
							{textSize === 'heading-two' && 'Heading 2'}
							{textSize === 'heading-three' && 'Heading 3'}
						</div>
						<Icon className='st-s-18'>
							<ChevronDown />
						</Icon>
					</div>
					{!!textSize && (
						<TextSizeItem label='Base Paragraph' onPress={handleClickTextSizeOption} />
					)}
					{textSize !== 'heading-three' && (
						<TextSizeItem
							label='Heading 3'
							textSize='heading-three'
							onPress={handleClickTextSizeOption}
						/>
					)}
					{textSize !== 'heading-two' && (
						<TextSizeItem
							label='Heading 2'
							textSize='heading-two'
							onPress={handleClickTextSizeOption}
						/>
					)}
					{textSize !== 'heading-one' && (
						<TextSizeItem
							label='Heading 1'
							textSize='heading-one'
							onPress={handleClickTextSizeOption}
						/>
					)}
				</div>
			</div>
			<div className='st-pt-16 st-px-16'>
				<div className='st-text-blue-500 st-font-medium st-mb-8'>Color</div>
				<div className='st-flex st-items-center st-space-x-6'>
					{PRESET_COLORS.map((o) => (
						<ColorItem
							color={o}
							key={o}
							selected={isEqualColor(o, colorMark)}
							onPress={handleClickColorOption}
						/>
					))}
					<ColorItem selected={!colorMark} onPress={handleClickColorOption} />
				</div>
			</div>
		</Popup>
	);
};

export const TextStylePopup = memo(BaseTextStylePopup);
