import {EditableElement, ImageElement, TableElement} from '../../../../../types';
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';

import Field from '../../field';
import Icon from '../../icon';
import {NodeEntry} from 'slate';
import {ReactComponent as Photo} from '../../../../../assets/images/icon-photo.svg';
import {isEnterKey} from '../../../../../utils';
import {resizeInlineImage} from '../../../../../packages/image/commands';
import {useSlateStatic} from 'slate-react';

type EditImageProps = {
	entry: NodeEntry<ImageElement | TableElement | EditableElement>;
};

const BaseEditImage: FC<EditImageProps> = ({entry}) => {
	const editor = useSlateStatic();
	const [node, path] = entry;

	if (node.type !== 'image') {
		return null;
	}

	const ratio = node.width / node.height;
	const [width, setWidth] = useState(node.width);
	const [height, setHeight] = useState(node.height);

	const handleChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
		const parsedValue = parseInt(e.target.value);
		const eventualWidth = isNaN(parsedValue) || parsedValue < 1 ? width : parsedValue;
		const eventualHeight = Math.round(eventualWidth / ratio);

		setWidth(eventualWidth);
		setHeight(eventualHeight);
	};

	const handleChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
		const parsedValue = parseInt(e.target.value);
		const eventualHeight = isNaN(parsedValue) || parsedValue < 1 ? height : parsedValue;
		const eventualWidth = Math.round(eventualHeight * ratio);

		setWidth(eventualWidth);
		setHeight(eventualHeight);
	};

	const persistChanges = () => {
		resizeInlineImage(editor, {
			entry: [node, path],
			width,
			height,
		});
	};

	const handleBlurInput = () => {
		persistChanges();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isEnterKey(e)) {
			persistChanges();
		}
	};

	return (
		<div>
			<div className='text-headline text-blue-500 mb-16'>Edit an image</div>
			<div className='space-y-8'>
				<div className='space-x-16 flex items-center'>
					<Icon className='s-20 text-gray-500'>
						<Photo />
					</Icon>
					<Field className='w-full'>
						<input
							title={node.url}
							disabled
							type='text'
							placeholder='Paste a link to an image'
							defaultValue={node.url}
						/>
					</Field>
				</div>
				<div className='flex items-center justify-between'>
					<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
						Width
					</div>
					<Field className='w-120'>
						<input
							type='number'
							placeholder='0'
							min={1}
							value={width}
							onChange={handleChangeWidth}
							onBlur={handleBlurInput}
							onKeyDown={handleKeyDown}
						/>
					</Field>
				</div>
				<div className='flex items-center justify-between'>
					<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
						Height
					</div>
					<Field className='w-120'>
						<input
							type='number'
							placeholder='0'
							min={1}
							value={height}
							onChange={handleChangeHeight}
							onBlur={handleBlurInput}
							onKeyDown={handleKeyDown}
						/>
					</Field>
				</div>
			</div>
		</div>
	);
};

export const EditImage = memo(BaseEditImage);
