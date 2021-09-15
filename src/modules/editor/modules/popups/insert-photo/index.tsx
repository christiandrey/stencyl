import {ImageDimensions, getImageSizeAsync} from '../../../../../packages/image/utils';
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';

import {Button} from '../../button';
import Field from '../../field';
import Icon from '../../icon';
import {ImageInsertOptions} from '../../../../../packages/image/commands';
import {ReactComponent as Photo} from '../../../../../assets/images/icon-photo.svg';
import {Popup} from '../../popup';
import {StencylPopupCoordinates} from '../../../../../types';
import {isValidUrl} from '../../../../../utils';
import {useDebounceEffect} from '../../../../../hooks';

type InsertPhotoPopupProps = {
	coordinates: StencylPopupCoordinates;
	isVisible: boolean;
	onRequestClose: () => void;
	onSubmit: (value: ImageInsertOptions) => void;
};

const BaseInsertPhotoPopup: FC<InsertPhotoPopupProps> = ({
	coordinates: {x, y},
	isVisible,
	onRequestClose,
	onSubmit,
}) => {
	const [url, setUrl] = useState('');
	const [scale, setScale] = useState('100');
	const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);

	const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
		setScale(e.target.value);
	};

	const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key?.toLowerCase() === 'enter') {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		if (!dimensions || !scale || !url?.length) {
			return;
		}

		let parsedScale = parseFloat(scale);
		parsedScale = isNaN(parsedScale) || parsedScale < 1 ? 1 : parsedScale;
		parsedScale = parsedScale / 100;

		onSubmit({
			url,
			width: dimensions.width * parsedScale,
			height: dimensions.height * parsedScale,
		});
		onRequestClose();
		resetFields();
	};

	const getAndSetImageDimensionsAsync = async () => {
		setDimensions(await getImageSizeAsync(url));
	};

	const resetFields = () => {
		setUrl('');
		setScale('100');
		setDimensions(null);
	};

	useDebounceEffect(() => {
		if (isValidUrl(url)) {
			getAndSetImageDimensionsAsync();
		}
	}, [url]);

	return (
		<Popup
			position='right'
			alignment='start'
			isVisible={isVisible}
			onRequestClose={onRequestClose}
			transparent
			hideArrow
			overlayCloseOnClick
			contentClassName='bg-white rounded-lg border-gray-50 border-solid border flex items-center py-8 px-8 space-x-8 text-gray-500'
			distance={4}
			offsets={{
				y: y + 16,
				x: x,
			}}
		>
			<Icon className='s-20'>
				<Photo />
			</Icon>
			<div className='flex items-center space-x-4'>
				<Field className='w-180'>
					<input
						autoFocus
						type='text'
						placeholder='Paste a link to an image'
						value={url}
						onChange={handleChangeUrl}
						onKeyDown={handleKeyDown}
					/>
				</Field>
				<div className='flex items-center justify-between px-8 h-36 border border-gray-200 rounded-lg transition:colors transition:shadow duration-250 focus-within:shadow-outline focus-within:border-blue-500'>
					<input
						value={scale}
						onChange={handleChangeScale}
						type='number'
						min={0}
						maxLength={3}
						onKeyDown={handleKeyDown}
						className='border-none h-full w-48 bg-transparent m-0'
						placeholder='100'
					/>
					<div>%</div>
				</div>
			</div>
			<Button disabled={!dimensions} className='h-36' onPress={handleSubmit}>
				Insert
			</Button>
		</Popup>
	);
};

export const InsertPhotoPopup = memo(BaseInsertPhotoPopup);
