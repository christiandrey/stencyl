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
			contentClassName='st-border-gray-50 st-border-solid st-border st-bg-white st-rounded-lg st-w-200 st-text-gray-500'
			distance={4}
			offsets={{
				y: y + 16,
				x: x,
			}}
		>
			<div className='st-p-8'>
				<div className='st-flex st-items-center st-justify-between st-px-8 st-h-36 st-w-full st-border st-border-gray-200 st-rounded-lg st-transition-all st-duration-250 focus-within:st-shadow-outline focus-within:st-border-blue-500'>
					<input
						autoFocus
						type='text'
						className='st-border-none st-h-full st-w-full st-bg-transparent m-0'
						placeholder='Search...'
						value={keyword}
						onChange={handleChangeKeyword}
					/>
					<Icon className='st-text-gray-500'>
						<ListSearch />
					</Icon>
				</div>
			</div>
			<div
				className={classNames({
					'st-pb-8': matchingElements.length,
				})}
			>
				{matchingElements.map(([node]) => (
					<div
						key={node.id}
						onClick={() => handleSelectOption(node)}
						className='st-px-8 st-h-28 st-flex st-items-center st-cursor-pointer st-bg-transparent st-transition-colors st-duration-250 hover:st-bg-gray-100'
					>
						<span
							style={{fontSize: '0.82em'}}
							className='st-inline-block st-text-white st-font-medium st-px-4 st-rounded-default st-mx-1 st-bg-blue-500'
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
