import React, {FC} from 'react';
import {RenderElementProps, useFocused, useSelected} from 'slate-react';

import classNames from 'classnames';

export const Image: FC<RenderElementProps> = ({element, attributes, children}) => {
	const selected = useSelected();
	const focused = useFocused();

	if (element.type === 'image') {
		return (
			<span {...attributes}>
				{children}
				<img
					className={classNames('inline-block max-w-full rounded-default align-bottom', {
						'shadow-outline': selected && focused,
					})}
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
