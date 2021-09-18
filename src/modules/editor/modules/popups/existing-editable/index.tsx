import {EditableElement, StencylPopupCoordinates} from '../../../../../types';
import React, {ChangeEvent, FC, memo, useCallback, useMemo, useState} from 'react';

import Icon from '../../icon';
import {ReactComponent as ListSearch} from '../../../../../assets/images/icon-list-search.svg';
import {Popup} from '../../popup';
import classNames from 'classnames';
import {getAllEditableElements} from '../../../../../packages/editable/utils';
import {useSlateStatic} from 'slate-react';

type ExistingEditablePopupProps = {
	coordinates: StencylPopupCoordinates;
	isVisible: boolean;
	onRequestClose: () => void;
	onSelect: (value: EditableElement) => void;
};

const BaseExistingEditablePopup: FC<ExistingEditablePopupProps> = ({
	coordinates: {x, y},
	isVisible,
	onRequestClose,
	onSelect,
}) => {
	const editor = useSlateStatic();

	const editableElements = getAllEditableElements(editor);

	const [keyword, setKeyword] = useState('');

	const matchingElements = useMemo(() => {
		return editableElements.filter(([node]) =>
			node.defaultValue.toLowerCase().includes(keyword.toLowerCase()),
		);
	}, [keyword, editableElements]);

	const handleSelectOption = useCallback(
		(option: EditableElement) => {
			onSelect(option);
			setKeyword('');
			onRequestClose();
		},
		[onSelect, onRequestClose],
	);

	const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value ?? '');
	};

	return (
		<Popup
			position='right'
			alignment='start'
			isVisible={isVisible}
			onRequestClose={onRequestClose}
			transparent
			hideArrow
			overlayCloseOnClick
			contentClassName='border-gray-50 border-solid border bg-white rounded-lg w-200 text-gray-500'
			distance={4}
			offsets={{
				y: y + 16,
				x: x,
			}}
		>
			<div className='p-8'>
				<div className='flex items-center justify-between px-8 h-36 w-full border border-gray-200 rounded-lg transition:colors transition:shadow duration-250 focus-within:shadow-outline focus-within:border-blue-500'>
					<input
						autoFocus
						type='text'
						className='border-none h-full w-full bg-transparent m-0'
						placeholder='Search...'
						value={keyword}
						onChange={handleChangeKeyword}
					/>
					<Icon className='text-gray-500'>
						<ListSearch />
					</Icon>
				</div>
			</div>
			<div
				className={classNames({
					'pb-8': matchingElements.length,
				})}
			>
				{matchingElements.map(([node]) => (
					<div
						key={node.id}
						onClick={() => handleSelectOption(node)}
						className='px-8 h-28 flex items-center cursor-pointer bg-transparent transition-colors duration-250 hover:bg-gray-100'
					>
						<span
							style={{fontSize: '0.82em'}}
							className='inline-block text-white font-medium px-4 rounded-default mx-1 bg-blue-500'
						>
							{node.defaultValue}
						</span>
					</div>
				))}
			</div>
		</Popup>
	);
};

export const ExistingEditablePopup = memo(BaseExistingEditablePopup);
