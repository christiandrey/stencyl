import React, {CSSProperties, FC, useMemo} from 'react';

import {RenderElementProps} from 'slate-react';

export const Headings: FC<RenderElementProps> = ({element, children, attributes}) => {
	const style = useMemo(() => {
		const properties: CSSProperties = {};

		if (
			element.type === 'heading-one' ||
			element.type === 'heading-two' ||
			element.type === 'heading-three' ||
			element.type === 'heading-four' ||
			element.type === 'heading-five' ||
			element.type === 'heading-six'
		) {
			if (element.indentation) {
				properties.marginLeft = `${element.indentation}%`;
			}

			if (element.alignment) {
				properties.textAlign = element.alignment;
			}
		}

		return properties;
	}, [element]);

	switch (element.type) {
		case 'heading-one':
			return (
				<h1 className='st-text-semi-title' style={style} {...attributes}>
					{children}
				</h1>
			);
		case 'heading-two':
			return (
				<h2 className='st-text-heading-1' style={style} {...attributes}>
					{children}
				</h2>
			);
		case 'heading-three':
			return (
				<h3 className='st-text-heading-2' style={style} {...attributes}>
					{children}
				</h3>
			);
		case 'heading-four':
			return (
				<h4 className='st-text-heading-3' style={style} {...attributes}>
					{children}
				</h4>
			);
		case 'heading-five':
			return (
				<h5 className='st-text-headline' style={style} {...attributes}>
					{children}
				</h5>
			);
		case 'heading-six':
			return (
				<h6 className='st-text-body' style={style} {...attributes}>
					{children}
				</h6>
			);
		default:
			return null;
	}
};
