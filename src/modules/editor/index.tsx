import {Descendant, createEditor} from 'slate';
import React, {
	ReactNode,
	Ref,
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {Slate, withReact} from 'slate-react';

import {Canvas} from './modules/canvas';
import {Sidebar} from './modules/sidebar';
import {StencylNode} from '../..';
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

type EditorProps = {
	children?: ReactNode;
	initialData?: Array<StencylNode>;
};

export type EditorRef = {
	getNodes: () => StencylNode[];
};

const BaseEditor = ({children, initialData}: EditorProps, ref: Ref<EditorRef>) => {
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
	const [editorState, setEditorState] = useState<Descendant[]>(
		initialData ?? [
			{
				type: 'paragraph',
				children: getEmptyTextNode(),
			},
		],
	);
	const [sidebarTop, setSidebarTop] = useState<string>();

	useLayoutEffect(() => {
		setSidebarTop(`calc(20px + ${bodyRef.current?.getBoundingClientRect().top ?? 0}px)`);
	}, []);

	useImperativeHandle(ref, () => ({
		getNodes: () => editor.children,
	}));

	return (
		<div className='st-bg-gray-200 st-min-h-screen'>
			<Slate editor={editor} value={editorState} onChange={setEditorState}>
				<div className='st-sticky st-top-0 st-w-full st-z-1 st-shadow-1'>
					{children}
					<Toolbar />
				</div>
				<div ref={bodyRef} className={classNames(css.body, 'st-flex st-justify-center')}>
					<div className='st-flex-1' />
					<Canvas />
					<div className='st-flex-1 st-px-20'>
						<div className={classNames(css.sidebar, 'st-sticky')} style={{top: sidebarTop}}>
							<Sidebar />
						</div>
					</div>
				</div>
			</Slate>
			<div id='stencyl-portal' />
		</div>
	);
};

export type Editor = EditorRef;

export const Editor = forwardRef(BaseEditor);
