import React, {FC, PropsWithChildren, memo, useCallback} from 'react';

import {Editable} from 'slate-react';
import {EditorElement} from '../element';
import {Leaf} from '../../../../packages/leaf';
import constants from '../../../../constants';
import css from './style.module.css';

type CanvasProps = PropsWithChildren<{}>;

const canvasWidthStyle = {
	width: constants.paperSizes.a4.width,
	minHeight: constants.paperSizes.a4.height,
};

const BaseCanvas: FC<CanvasProps> = () => {
	const renderElement = useCallback((props) => <EditorElement {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

	return (
		<div className={css.container} style={canvasWidthStyle}>
			<Editable
				spellCheck
				placeholder='Start typing...'
				renderElement={renderElement}
				renderLeaf={renderLeaf}
			/>
		</div>
	);
};

export const Canvas = memo(BaseCanvas);
