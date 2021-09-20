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
						className={classNames(
							'st-inline-block st-max-w-full st-rounded-default st-align-bottom',
							{
								'st-shadow-outline': selected && focused,
							},
						)}
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
				<div {...attributes}>
					<div contentEditable={false}>
						<span
							className={classNames(
								'st-inline-block st-font-medium st-px-4 st-rounded-default st-bg-gray-300',
								{
									'st-shadow-outline': selected && focused,
								},
							)}
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
				className={classNames(
					'st-inline-block st-text-white st-font-medium st-px-4 st-rounded-default st-mx-1',
					{
						'st-shadow-outline': selected && focused,
						'st-bg-blue-500': !editable.marks.condition,
						'st-bg-green-500': editable.marks.condition,
					},
				)}
				style={{fontSize: '0.82em'}}
			>
				{editable.defaultValue}
				{children}
			</span>
		);
	}

	return null;
};
