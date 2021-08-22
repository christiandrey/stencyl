import React, {FC} from 'react';

import {RenderLeafProps} from 'slate-react';

export const Leaf: FC<RenderLeafProps> = ({attributes, children, leaf}) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	if (leaf.strikethrough) {
		children = <del>{children}</del>;
	}

	return (
		<span
			{...attributes}
			style={{color: leaf.color}}
			className={leaf.condition ? 'bg-green-highlight' : undefined}
		>
			{children}
		</span>
	);
};
