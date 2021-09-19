import React, {FC} from 'react';
import {getValueFromDataset, shouldRenderByCondition} from '../../../utils';

import {Leaf} from '../leaf';
import {RenderElementProps} from 'slate-react';
import classNames from 'classnames';
import {getPlaceholderImage} from '../../../../../utils';
import {previewDatasetState} from '../../../state';
import {useHookState} from '../../../../../packages/hookstate/hooks';

export const Editable: FC<RenderElementProps> = ({element, children, attributes}) => {
	const [dataset] = useHookState(previewDatasetState);

	if (
		element.type !== 'editable' ||
		element.isInvisible ||
		!shouldRenderByCondition(dataset, element.marks.condition)
	) {
		return null;
	}

	const value = getValueFromDataset(dataset, element);

	if (value) {
		return element.dataType === 'image' ? (
			<span {...attributes}>
				{children}
				<img
					className={classNames('inline-block max-w-full rounded-default align-bottom')}
					src={value}
					style={{
						width: element.width,
						height: element.height,
					}}
				/>
			</span>
		) : (
			<Leaf
				text={{text: value}}
				attributes={{'data-slate-leaf': true}}
				leaf={{
					text: value,
					...element.marks,
				}}
			>
				{value}
			</Leaf>
		);
	}

	if (element.dataType === 'image') {
		return (
			<span {...attributes}>
				{children}
				<img
					className={classNames('inline-block max-w-full rounded-default align-bottom')}
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
			className={classNames(
				'inline-block text-white font-medium px-4 rounded-default mx-1 bg-blue-500',
			)}
			style={{fontSize: '0.82em'}}
		>
			{element.defaultValue}
			{children}
		</span>
	);
};
