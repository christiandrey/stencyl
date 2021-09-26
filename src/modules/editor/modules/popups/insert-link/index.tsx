import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';

import {Button} from '../../button';
import Field from '../../field';
import Icon from '../../icon';
import {ReactComponent as Link} from '../../../../../assets/images/icon-link.svg';
import {Popup} from '../../popup';
import {StencylPopupCoordinates} from '../../../../../types';
import {isValidUrl} from '../../../../../utils';

type InsertLinkPopupProps = {
	coordinates: StencylPopupCoordinates;
	isVisible: boolean;
	onRequestClose: () => void;
	onSubmit: (url: string) => void;
};

const BaseInsertLinkPopup: FC<InsertLinkPopupProps> = ({
	coordinates: {x, y},
	isVisible,
	onRequestClose,
	onSubmit,
}) => {
	const [url, setUrl] = useState('');
	const isValid = isValidUrl(url);

	const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key?.toLowerCase() === 'enter') {
			e.preventDefault();
			e.stopPropagation();
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		if (!isValid) {
			return;
		}

		onSubmit(url);
		onRequestClose();
		setUrl('');
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
			contentClassName='st-bg-white st-rounded-lg st-border-gray-50 st-border-solid st-border st-flex st-items-center st-py-8 st-px-8 st-space-x-8 st-text-gray-500'
			distance={4}
			offsets={{
				y: y + 16,
				x: x,
			}}
		>
			<Icon className='st-s-20'>
				<Link />
			</Icon>
			<div className='st-flex st-items-center st-space-x-4'>
				<Field className='st-w-180'>
					<input
						autoFocus
						type='text'
						placeholder='Paste a link to a web page'
						value={url}
						onChange={handleChangeUrl}
						onKeyDown={handleKeyDown}
					/>
				</Field>
			</div>
			<Button disabled={!isValid} className='st-h-36' onPress={handleSubmit}>
				Insert
			</Button>
		</Popup>
	);
};

export const InsertLinkPopup = memo(BaseInsertLinkPopup);
