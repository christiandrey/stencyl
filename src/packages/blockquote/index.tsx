import React, {CSSProperties, FC, useMemo} from 'react';

import {RenderElementProps} from 'slate-react';

export const Blockquote: FC<RenderElementProps> = ({element, children, attributes}) => {
	const style = useMemo(() => {
		const properties: CSSProperties = {};

		if (element.type === 'block-quote') {
			if (element.indentation) {
				properties.marginLeft = `${element.indentation}%`;
			}

			if (element.alignment) {
				properties.textAlign = element.alignment;
			}
		}

		return properties;
	}, [element]);

	return (
		<blockquote className='ml-40' style={style} {...attributes}>
			{children}
		</blockquote>
	);
};
