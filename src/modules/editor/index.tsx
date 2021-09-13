import {Descendant, createEditor} from 'slate';
import React, {FC, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {Slate, withReact} from 'slate-react';

import {Canvas} from './modules/canvas';
import {EditEditable} from './modules/sidebar/edit-editable';
import {Toolbar} from './modules/toolbar';
import classNames from 'classnames';
import css from './style.module.css';
import {getEmptyTextNode} from '../../packages/common/utils';
import {pipeline} from '../../utils';
import {withEditable} from '../../packages/editable/plugin';
import {withHTMLDeserializer} from '../../packages/deserialize';
import {withHistory} from 'slate-history';
import {withImage} from '../../packages/image/plugin';
import {withLink} from '../../packages/link/plugin';
import {withLists} from '../../packages/lists/plugin';
import {withTable} from '../../packages/table/plugin';
import {withTrailingBlock} from '../../packages/common/plugin';

type EditorProps = {};

export const Editor: FC<EditorProps> = () => {
	const initialData = useRef<Descendant[]>([
		// {
		// 	type: 'paragraph',
		// 	children: [
		// 		{text: 'A line of text in a paragraph.'},
		// 		// {
		// 		// 	type: 'image',
		// 		// 	url: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
		// 		// 	width: 100,
		// 		// 	height: 100,
		// 		// 	children: getEmptyTextNode(),
		// 		// },
		// 	],
		// },
		// {
		// 	type: 'bulleted-list',
		// 	children: [
		// 		// {
		// 		// 	type: 'list-item',
		// 		// 	children: [
		// 		// 		{
		// 		// 			type: 'list-item-container',
		// 		// 			children: [
		// 		// 				{
		// 		// 					text: 'A beginning line of text in a paragraph',
		// 		// 				},
		// 		// 			],
		// 		// 		},
		// 		// 	],
		// 		// },
		// 		{
		// 			type: 'list-item',
		// 			children: [
		// 				{
		// 					type: 'list-item-container',
		// 					children: [
		// 						{
		// 							text: 'A line of text in a paragraph',
		// 						},
		// 					],
		// 				},
		// 				{
		// 					type: 'numbered-list',
		// 					children: [
		// 						{
		// 							type: 'list-item',
		// 							children: [
		// 								{
		// 									type: 'list-item-container',
		// 									children: [{text: 'A line of text is nested'}],
		// 								},
		// 							],
		// 						},
		// 						// {
		// 						// 	type: 'list-item',
		// 						// 	children: [
		// 						// 		{
		// 						// 			type: 'list-item-container',
		// 						// 			children: [{text: 'Another line of text is nested'}],
		// 						// 		},
		// 						// 	],
		// 						// },
		// 						// {
		// 						// 	type: 'list-item',
		// 						// 	children: [
		// 						// 		{
		// 						// 			type: 'list-item-container',
		// 						// 			children: [{text: 'A third line of text is nested'}],
		// 						// 		},
		// 						// 	],
		// 						// },
		// 					],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// {
		// 	type: 'editable',
		// 	id: '5df7aa1f-cf60-460a-b0fe-968bbd1bed75',
		// 	defaultValue: '',
		// 	label: 'What is your name?',
		// 	editable: true,
		// 	isInvisible: true,
		// 	children: getEmptyTextNode(),
		// 	marks: {},
		// 	dataType: 'options',
		// 	options: [],
		// },
		{
			type: 'paragraph',
			children: getEmptyTextNode(),
		},
	]);
	const bodyRef = useRef<HTMLDivElement>(null);
	const editor = useMemo(
		() =>
			pipeline([
				createEditor,
				withHistory,
				withReact,
				withLink,
				withImage,
				withEditable,
				withLists,
				withTable,
				withTrailingBlock,
				withHTMLDeserializer,
			])(),
		[],
	);
	const [editorState, setEditorState] = useState<Descendant[]>(initialData.current);
	const [sidebarTop, setSidebarTop] = useState<string>();

	useLayoutEffect(() => {
		setSidebarTop(`calc(20px + ${bodyRef.current?.getBoundingClientRect().top ?? 0}px)`);
	}, []);

	return (
		<div className='bg-gray-200 min-h-screen'>
			<Slate editor={editor} value={editorState} onChange={setEditorState}>
				<div className='sticky top-0 w-full z-1 shadow-1'>
					{/* Put header component here */}
					<Toolbar />
				</div>
				<div ref={bodyRef} className={classNames(css.body, 'flex justify-center')}>
					<div className='flex-1' />
					<Canvas />
					<div className='flex-1 px-20'>
						<div
							className={classNames(css.sidebar, 'sticky shadow-1 rounded-lg w-full bg-white p-16')}
							style={{top: sidebarTop}}
						>
							<EditEditable />
						</div>
					</div>
				</div>
			</Slate>
			<div id='stencyl-portal' />
		</div>
	);
};
