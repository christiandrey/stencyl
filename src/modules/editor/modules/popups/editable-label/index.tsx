import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';

import {Button} from '../../button';
import Field from '../../field';
import {Popup} from '../../popup';
import {StencylPopupCoordinates} from '../../../../../types';

type EditableLabelPopupProps = {
	coordinates: StencylPopupCoordinates;
	isVisible: boolean;
	onRequestClose: () => void;
	onSubmit: (value: string) => void;
};

const BaseEditableLabelPopup: FC<EditableLabelPopupProps> = ({
	coordinates: {x, y},
	isVisible,
	onRequestClose,
	onSubmit,
}) => {
	const [label, setLabel] = useState('');

	const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
		setLabel(e.target.value ?? '');
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key?.toLowerCase() === 'enter') {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		if (!label?.length) {
			return;
		}

		onSubmit(label);
		onRequestClose();
		setLabel('');
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
			contentClassName='st-border-gray-50 st-border-solid st-border st-bg-white st-rounded-lg st-flex st-items-center st-py-8 st-px-8 st-space-x-8 st-text-gray-500'
			distance={4}
			offsets={{
				y: y + 16,
				x: x,
			}}
		>
			<Field className='st-w-320'>
				<input
					autoFocus
					type='text'
					placeholder='Type a question here...'
					value={label}
					onChange={handleChangeLabel}
					onKeyDown={handleKeyDown}
				/>
			</Field>
			<Button className='st-h-36' onPress={handleSubmit} disabled={!label.length}>
				Done
			</Button>
		</Popup>
	);
};

export const EditableLabelPopup = memo(BaseEditableLabelPopup);
