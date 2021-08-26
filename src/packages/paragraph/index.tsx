import React, {CSSProperties, FC, useMemo} from 'react';

import {RenderElementProps} from 'slate-react';

export const Paragraph: FC<RenderElementProps> = ({element, children, attributes}) => {
	const style = useMemo(() => {
		const properties: CSSProperties = {};

		if (element.type === 'paragraph') {
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
		<p style={style} {...attributes}>
			{children}
		</p>
	);
};
