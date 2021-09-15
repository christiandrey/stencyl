import {AnchorRef, Popup} from '../../popup';
import React, {FC, memo} from 'react';

import {Range} from 'slate';
import {StencylEditableElementTypes} from '../../../../../types';
import classNames from 'classnames';
import {useSlateStatic} from 'slate-react';

export type InsertEditableType = StencylEditableElementTypes | 'question' | 'existing';

type EditableTypePopupProps = {
	anchorRef: AnchorRef;
	isVisible: boolean;
	onRequestClose: () => void;
	onSelect: (value: InsertEditableType) => void;
};

type OptionItemProps = {
	id: InsertEditableType;
	label: string;
	disabled?: boolean;
	onPress: (id: InsertEditableType) => void;
};

const OptionItem: FC<OptionItemProps> = ({disabled, id, label, onPress}) => {
	return (
		<div
			onClick={() => onPress(id)}
			className={classNames(
				'h-36 flex items-center transition-colors duration-250 hover:text-gray-900 cursor-pointer',
				{
					'pointer-events-none opacity-50': disabled,
				},
			)}
		>
			<div>{label}</div>
		</div>
	);
};

const BaseEditableTypePopup: FC<EditableTypePopupProps> = ({
	anchorRef,
	isVisible,
	onRequestClose,
	onSelect,
}) => {
	const editor = useSlateStatic();
	const rangeIsCollapsed = editor.selection ? Range.isCollapsed(editor.selection) : true;

	const handleClickOption = (option: InsertEditableType) => {
		onSelect(option);
		onRequestClose();
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
			contentClassName='bg-white rounded-lg py-8 px-16 w-144 text-gray-500'
			distance={4}
			offsets={{
				y: 16,
			}}
		>
			<OptionItem id='text' label='Text' disabled={rangeIsCollapsed} onPress={handleClickOption} />
			<OptionItem
				id='image'
				label='Image'
				disabled={rangeIsCollapsed}
				onPress={handleClickOption}
			/>
			<OptionItem
				id='options'
				label='Dropdown'
				disabled={rangeIsCollapsed}
				onPress={handleClickOption}
			/>
			<OptionItem
				id='radio'
				label='Radio'
				disabled={rangeIsCollapsed}
				onPress={handleClickOption}
			/>
			<OptionItem id='date' label='Date' disabled={rangeIsCollapsed} onPress={handleClickOption} />
			<OptionItem id='time' label='Time' disabled={rangeIsCollapsed} onPress={handleClickOption} />
			<OptionItem id='question' label='Question only' onPress={handleClickOption} />
			<OptionItem
				id='existing'
				label='From existing...'
				disabled={!rangeIsCollapsed}
				onPress={handleClickOption}
			/>
		</Popup>
	);
};

export const EditableTypePopup = memo(BaseEditableTypePopup);
