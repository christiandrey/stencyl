import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

import {ReactComponent as CirclePlus} from '../../../../assets/images/icon-circle-plus.svg';
import Icon from '../icon';
import {StencylOption} from '../../../../types';
import {ReactComponent as Trash} from '../../../../assets/images/icon-trash.svg';

type OptionItemProps = {
	option: StencylOption;
	onClickDelete?: (id: string) => void;
};

type OptionsProps = {
	className?: string;
	label?: string;
	options: Array<StencylOption>;
	onCreateOption?: (text: string) => void;
	onDeleteOption?: (id: string) => void;
};

const OptionItem: FC<OptionItemProps> = ({option, onClickDelete}) => {
	return (
		<div className='st-flex st-items-center st-justify-between st-px-8 st-h-36 st-w-full st-border st-border-gray-200 st-bg-gray-100 st-rounded-lg'>
			<span className='st-text-gray-500'>{option.label}</span>
			<Icon
				onPress={() => onClickDelete?.(option.id)}
				className='st-cursor-pointer st-text-gray-500 st-transition-colors st-duration-250 hover:st-text-red-300'
			>
				<Trash />
			</Icon>
		</div>
	);
};

export const Options: FC<OptionsProps> = ({
	className,
	label,
	options,
	onCreateOption,
	onDeleteOption,
}) => {
	const [editingOption, setEditingOption] = useState('');

	const handleSubmitEditingOption = () => {
		if (!editingOption?.trim().length) {
			return;
		}

		onCreateOption?.(editingOption);
		setEditingOption('');
	};

	const handleChangeEditingOption = (e: ChangeEvent<HTMLInputElement>) => {
		setEditingOption(e.target.value);
	};

	const handleEditingOptionKeydown = (e: KeyboardEvent) => {
		if (e.key?.toLowerCase() === 'enter') {
			e.preventDefault();
			handleSubmitEditingOption();
		}
	};

	return (
		<div className={className}>
			{!!label?.length && (
				<label className='st-text-blue-500 st-block st-mb-4 st-text-subhead st-font-medium'>
					{label}
				</label>
			)}
			<div className='st-space-y-8'>
				{options.map((o) => (
					<OptionItem option={o} key={o.id} onClickDelete={onDeleteOption} />
				))}
				<div className='st-flex st-items-center st-justify-between st-px-8 st-h-36 st-w-full st-border st-border-gray-200 st-rounded-lg st-transition-all st-duration-250 focus-within:st-shadow-outline focus-within:st-border-blue-500'>
					<input
						value={editingOption}
						className='st-border-none st-h-full st-w-full st-bg-transparent st-m-0'
						placeholder='+ Add an option'
						onChange={handleChangeEditingOption}
						onKeyDown={handleEditingOptionKeydown}
					/>
					<Icon
						onPress={handleSubmitEditingOption}
						className='st-cursor-pointer st-text-blue-500 st-transition-colors st-duration-250 hover:st-text-blue-600'
					>
						<CirclePlus />
					</Icon>
				</div>
			</div>
		</div>
	);
};
