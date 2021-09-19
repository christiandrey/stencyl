import React, {FC} from 'react';

import {RenderElementProps} from 'slate-react';
import classNames from 'classnames';

export const Image: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'image') {
		return (
			<span {...attributes}>
				{children}
				<img
					className={classNames('inline-block max-w-full rounded-default align-bottom')}
					src={element.url}
					style={{
						width: element.width,
						height: element.height,
					}}
				/>
			</span>
		);
	}

	return null;
};
