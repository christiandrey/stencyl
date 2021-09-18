import React, {FC, memo} from 'react';

import {Descendant} from 'slate';
import {Slice} from '../slice';
import classNames from 'classnames';
import constants from '../../../../../constants';
import css from './style.module.css';

type CanvasProps = {
	className?: string;
	nodes: Array<Descendant>;
};

const canvasWidthStyle = {
	width: constants.paperSizes.a4.width,
	minHeight: constants.paperSizes.a4.height,
};

const BaseCanvas: FC<CanvasProps> = ({className, nodes}) => {
	return (
		<div className={classNames(css.container, className)} style={canvasWidthStyle}>
			{nodes.map((node, i) => (
				<Slice key={i} node={node} nodes={nodes} />
			))}
		</div>
	);
};

export const Canvas = memo(BaseCanvas);
