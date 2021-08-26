import React, {FC} from 'react';

import {RenderElementProps} from 'slate-react';

export const Link: FC<RenderElementProps> = ({element, children, attributes}) => {
	return (
		<a
			className='underline'
			href={element.type === 'link' ? element.url : undefined}
			{...attributes}
		>
			{children}
		</a>
	);
};
