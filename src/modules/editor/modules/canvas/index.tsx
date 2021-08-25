import {Editable, useSlateStatic} from 'slate-react';
import React, {FC, KeyboardEvent, PropsWithChildren, memo, useCallback} from 'react';

import {EditorElement} from '../element';
import {Leaf} from '../../../../packages/leaf';
import constants from '../../../../constants';
import css from './style.module.css';
import {runKeyBindings} from '../../../../packages/keybindings';

type CanvasProps = PropsWithChildren<{}>;

const canvasWidthStyle = {
	width: constants.paperSizes.a4.width,
	minHeight: constants.paperSizes.a4.height,
};

const BaseCanvas: FC<CanvasProps> = () => {
	const editor = useSlateStatic();
	const renderElement = useCallback((props) => <EditorElement {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		runKeyBindings(editor, e);
	}, []);

	return (
		<div className={css.container} style={canvasWidthStyle}>
			<Editable
				spellCheck
				placeholder='Start typing...'
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};

export const Canvas = memo(BaseCanvas);
