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
		<div className='flex items-center justify-between px-8 h-36 w-full border border-gray-200 bg-gray-100 rounded-lg'>
			<span className='text-gray-500'>{option.label}</span>
			<Icon
				onPress={() => onClickDelete?.(option.id)}
				className='cursor-pointer text-gray-500 transition-colors duration-250 hover:text-red-300'
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
				<label className='text-blue-500 block mb-4 text-subhead font-medium'>{label}</label>
			)}
			<div className='space-y-8'>
				{options.map((o) => (
					<OptionItem option={o} key={o.id} onClickDelete={onDeleteOption} />
				))}
				<div className='flex items-center justify-between px-8 h-36 w-full border border-gray-200 rounded-lg transition:colors transition:shadow duration-250 focus-within:shadow-outline focus-within:border-blue-500'>
					<input
						value={editingOption}
						className='border-none h-full w-full bg-transparent m-0'
						placeholder='+ Add an option'
						onChange={handleChangeEditingOption}
						onKeyDown={handleEditingOptionKeydown}
					/>
					<Icon
						onPress={handleSubmitEditingOption}
						className='cursor-pointer text-blue-500 transition-colors duration-250 hover:text-blue-600'
					>
						<CirclePlus />
					</Icon>
				</div>
			</div>
		</div>
	);
};
