import React, {CSSProperties, FC, useMemo} from 'react';

import {RenderElementProps} from 'slate-react';

export const List: FC<RenderElementProps> = ({element, children, attributes}) => {
	const style = useMemo(() => {
		const properties: CSSProperties = {};

		if (element.type === 'numbered-list' || element.type === 'bulleted-list') {
			if (element.indentation) {
				properties.marginLeft = `${element.indentation}%`;
			}
		}

		return properties;
	}, [element]);

	if (element.type === 'bulleted-list') {
		return (
			<ul {...attributes} style={style}>
				{children}
			</ul>
		);
	}

	if (element.type === 'numbered-list') {
		return (
			<ol {...attributes} style={style}>
				{children}
			</ol>
		);
	}

	return null;
};

export const ListItem: FC<RenderElementProps> = ({element, attributes, children}) => {
	if (element.type === 'list-item') {
		return <li {...attributes}>{children}</li>;
	}

	return null;
};
