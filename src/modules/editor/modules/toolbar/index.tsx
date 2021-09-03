import React, {MouseEvent, memo} from 'react';

import {createEditableElement} from '../../../../packages/editable/utils';
import {insertInlineEditable} from '../../../../packages/editable/commands';
import {toggleBoldMark} from '../../../../packages/leaf/commands';
import {useSlateStatic} from 'slate-react';

const BaseToolbar = () => {
	const editor = useSlateStatic();

	const handleAction1Mousedown = (e: MouseEvent) => {
		e.preventDefault();
		insertInlineEditable(
			editor,
			createEditableElement(editor, {
				dataType: 'text',
				defaultValue: 'Some text',
				label: 'What is your age?',
				tip: 'Your age goes here',
			}),
		);
	};

	const handleAction2Mousedown = (e: MouseEvent) => {
		e.preventDefault();
		toggleBoldMark(editor);
	};

	console.log('RENDER');

	return (
		<div className='flex items-center justify-center py-16 space-x-12'>
			<button className='bg-blue-700 text-white px-12 py-6' onMouseDown={handleAction1Mousedown}>
				Action 1
			</button>
			<button className='bg-green-500 text-white px-12 py-6' onMouseDown={handleAction2Mousedown}>
				Action 2
			</button>
		</div>
	);
};

export const Toolbar = memo(BaseToolbar);
