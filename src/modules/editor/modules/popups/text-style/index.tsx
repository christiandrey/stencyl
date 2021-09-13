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
				'w-20 h-20 rounded-full cursor-pointer duration-250 transition-shadow hover:shadow-outline',
				{
					'shadow-outline': selected,
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
			className='h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer'
		>
			<div
				className={classNames({
					'text-headline': textSize === 'heading-three',
					'text-heading-3': textSize === 'heading-two',
					'text-heading-2': textSize === 'heading-one',
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
						onMouseDown={handleClickSelector}
						className='h-36 flex items-center space-x-6 transition-colors duration-250 hover:text-gray-900 cursor-pointer'
					>
						<div>
							{!textSize && 'Base Paragraph'}
							{textSize === 'heading-one' && 'Heading 1'}
							{textSize === 'heading-two' && 'Heading 2'}
							{textSize === 'heading-three' && 'Heading 3'}
						</div>
						<Icon className='s-18'>
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
			<div className='pt-16 px-16'>
				<div className='text-blue-500 font-medium mb-8'>Color</div>
				<div className='flex items-center space-x-6'>
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
