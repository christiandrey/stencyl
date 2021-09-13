import React, {memo} from 'react';

import Field from '../../field';
import {Options} from '../../options';
import Switch from '../../switch';

const BaseEditEditable = () => {
	return (
		<div>
			<div className='text-headline text-blue-500 mb-8'>Editable text</div>
			<div className='text-gray-500 mb-24 text-subhead'>
				Use these tools to add or modify features on the table.
			</div>
			<div className='space-y-16'>
				<Field label='Question'>
					<input type='text' placeholder='Type a question here...' />
				</Field>
				<div className='flex items-center justify-between'>
					<div>Multiline text</div>
					<Switch value onChangeValue={() => false} />
				</div>
				<Field label='Date format'>
					<select>
						<option hidden value=''>
							Choose one
						</option>
					</select>
				</Field>
				<Field label='Description'>
					<input type='text' placeholder='Type a description here' />
				</Field>
				<Options label='Options' options={[]} />
			</div>
		</div>
	);
};

export const EditEditable = memo(BaseEditEditable);
