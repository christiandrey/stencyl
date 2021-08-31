import React, {MouseEvent, memo} from 'react';

import {insertNumberedListBlock} from '../../../../packages/lists/commands';
import {useSlateStatic} from 'slate-react';

const BaseToolbar = () => {
	const editor = useSlateStatic();

	const handleTestMousedown = (e: MouseEvent) => {
		e.preventDefault();
		insertNumberedListBlock(editor);
	};

	console.log('RENDER');

	return (
		<div className='flex items-center justify-center py-16'>
			<button className='bg-blue-700 text-white px-12 py-6' onMouseDown={handleTestMousedown}>
				Test
			</button>
		</div>
	);
};

export const Toolbar = memo(BaseToolbar);
