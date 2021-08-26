import {Descendant, createEditor} from 'slate';
import React, {FC, useMemo, useRef, useState} from 'react';
import {Slate, withReact} from 'slate-react';

import {Canvas} from './modules/canvas';
import {Toolbar} from './modules/toolbar';
import classNames from 'classnames';
import css from './style.module.css';
import {withHTMLDeserializer} from '../../packages/deserialize';
import {withHistory} from 'slate-history';
import {withImage} from '../../packages/image/plugin';
import {withLink} from '../../packages/link/plugin';
import {withTrailingBlock} from '../../packages/common/plugin';

type EditorProps = {};

export const Editor: FC<EditorProps> = () => {
	const initialData = useRef<Descendant[]>([
		{
			type: 'paragraph',
			children: [
				{text: 'A line of text in a paragraph.'},
				// {
				// 	type: 'image',
				// 	url: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
				// 	width: 100,
				// 	height: 100,
				// 	children: EMPTY_TEXT_NODE,
				// },
			],
		},
	]);
	const editor = useMemo(
		() =>
			withHTMLDeserializer(
				withTrailingBlock(withImage(withLink(withReact(withHistory(createEditor()))))),
			),
		[],
	);
	const [editorState, setEditorState] = useState<Descendant[]>(initialData.current);

	return (
		<div className='bg-gray-200 min-h-screen'>
			<Slate editor={editor} value={editorState} onChange={setEditorState}>
				<Toolbar />
				<div className={classNames(css.body, 'flex justify-center')}>
					<Canvas />
				</div>
			</Slate>
		</div>
	);
};
