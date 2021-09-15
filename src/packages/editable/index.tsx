import React, {FC} from 'react';
import {RenderElementProps, useFocused, useSelected} from 'slate-react';

import classNames from 'classnames';
import {getEditableElementAttributes} from './utils';
import {getPlaceholderImage} from '../../utils';

export const Editable: FC<RenderElementProps> = ({element, children, attributes}) => {
	const selected = useSelected();
	const focused = useFocused();
	const editable = getEditableElementAttributes(element);

	if (editable.type === 'editable') {
		if (editable.dataType === 'image') {
			return (
				<span {...attributes}>
					{children}
					<img
						className={classNames('inline-block max-w-full rounded-default align-bottom', {
							'shadow-outline': selected && focused,
						})}
						src={getPlaceholderImage(editable.width, editable.height)}
						style={{
							width: editable.width,
							height: editable.height,
						}}
					/>
				</span>
			);
		}

		if (editable.isInvisible) {
			return (
				<div {...attributes} className='py-6'>
					<div contentEditable={false}>
						<span
							className={classNames('inline-block font-medium px-4 rounded-default bg-gray-300', {
								'shadow-outline': selected && focused,
							})}
							style={{fontSize: '0.82em'}}
						>
							{editable.label}
						</span>
					</div>
					{children}
				</div>
			);
		}

		return (
			<span
				{...attributes}
				contentEditable={false}
				className={classNames('inline-block text-white font-medium px-4 rounded-default mx-1', {
					'shadow-outline': selected && focused,
					'bg-blue-500': !editable.marks.condition,
					'bg-green-500': editable.marks.condition,
				})}
				style={{fontSize: '0.82em'}}
			>
				{editable.defaultValue}
				{children}
			</span>
		);
	}

	return null;
};
