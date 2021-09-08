import React, {memo} from 'react';

import {Button} from '../../button';
import Field from '../../field';
import Icon from '../../icon';
import {ReactComponent as Photo} from '../../../../../assets/images/icon-photo.svg';

const BaseEditImage = () => {
	return (
		<div>
			<div className='text-headline text-blue-500 mb-16'>Edit an image</div>
			<div className='space-y-8 mb-16'>
				<div className='space-x-16 flex items-center'>
					<Icon className='s-20 text-gray-500'>
						<Photo />
					</Icon>
					<Field className='w-full'>
						<input type='text' placeholder='Paste a link to an image' />
					</Field>
				</div>
				<div className='flex items-center justify-between'>
					<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
						Width
					</div>
					<Field className='w-120'>
						<input type='number' placeholder='0' min={1} />
					</Field>
				</div>
				<div className='flex items-center justify-between'>
					<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
						Height
					</div>
					<Field className='w-120'>
						<input type='number' placeholder='0' min={1} />
					</Field>
				</div>
			</div>
			<div className='flex justify-end'>
				<Button>Save</Button>
			</div>
		</div>
	);
};

export const EditImage = memo(BaseEditImage);
