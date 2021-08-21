import React, {FC, PropsWithChildren, memo} from 'react';

import {Editable} from 'slate-react';
import constants from '../../../../constants';
import css from './style.module.css';

type CanvasProps = PropsWithChildren<{}>;

const canvasWidthStyle = {
	width: constants.paperSizes.a4.width,
	minHeight: constants.paperSizes.a4.height,
};

const BaseCanvas: FC<CanvasProps> = () => {
	return (
		<div className={css.container} style={canvasWidthStyle}>
			<Editable spellCheck placeholder='Start typing...' />
		</div>
	);
};

export const Canvas = memo(BaseCanvas);
