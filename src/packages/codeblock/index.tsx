import React, {CSSProperties, FC, useMemo} from 'react';

import {RenderElementProps} from 'slate-react';

export const Codeblock: FC<RenderElementProps> = ({element, children, attributes}) => {
	const style = useMemo(() => {
		const properties: CSSProperties = {};

		if (element.type === 'code-block') {
			if (element.indentation) {
				properties.paddingLeft = `${element.indentation}%`;
			}

			if (element.alignment) {
				properties.textAlign = element.alignment;
			}
		}

		return properties;
	}, [element]);

	return (
		<pre style={style} className='bg-gray-100 rounded-default p-12'>
			<code {...attributes}>{children}</code>
		</pre>
	);
};
