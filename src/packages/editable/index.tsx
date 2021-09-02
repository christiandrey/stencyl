import React, {FC} from 'react';
import {RenderElementProps, useFocused, useSelected} from 'slate-react';

import classNames from 'classnames';
import {getPlaceholderImage} from '../../utils';

export const Editable: FC<RenderElementProps> = ({element, children, attributes}) => {
	const selected = useSelected();
	const focused = useFocused();

	if (element.type === 'editable') {
		if (element.dataType === 'image') {
			return (
				<span {...attributes}>
					{children}
					<img
						className={classNames('inline-block max-w-full rounded-default align-bottom', {
							'shadow-outline': selected && focused,
						})}
						src={getPlaceholderImage(element.width, element.height)}
						style={{
							width: element.width,
							height: element.height,
						}}
					/>
				</span>
			);
		}

		return (
			<span
				{...attributes}
				contentEditable={false}
				className={classNames(
					'bg-blue-500 inline-block text-white font-medium px-4 rounded-default mx-1',
					{
						'shadow-outline': selected && focused,
					},
				)}
				style={{fontSize: '0.82em'}}
			>
				{element.defaultValue}
				{children}
			</span>
		);
	}

	return null;
};
