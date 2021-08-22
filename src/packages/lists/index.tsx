import React, {FC} from 'react';

import {RenderElementProps} from 'slate-react';

export const List: FC<RenderElementProps> = ({element, children, attributes}) => {
	if (element.type === 'bulleted-list') {
		return <ul {...attributes}>{children}</ul>;
	}

	if (element.type === 'numbered-list') {
		return <ol {...attributes}>{children}</ol>;
	}

	return null;
};

export const ListItem: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'list-item') {
		return <li {...attributes}>{children}</li>;
	}

	return null;
};
