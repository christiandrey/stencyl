import React, {FC} from 'react';

import {RenderLeafProps} from 'slate-react';
import {previewDatasetState} from '../../../state';
import {shouldRenderByCondition} from '../../../utils';
import {useHookState} from '../../../../../packages/hookstate/hooks';

export const Leaf: FC<RenderLeafProps> = ({attributes, children, leaf}) => {
	const [dataset] = useHookState(previewDatasetState);
	const shouldRender = shouldRenderByCondition(dataset, leaf.condition);

	if (!shouldRender) {
		return null;
	}

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
		<span {...attributes} style={{color: leaf.color}}>
			{children}
		</span>
	);
};
