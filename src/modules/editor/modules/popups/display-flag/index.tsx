import React, {ChangeEvent, FC, memo, useMemo, useState} from 'react';
import {
	StencylDisplayCondition,
	StencylOption,
	StencylPopupCoordinates,
} from '../../../../../types';

import {Button} from '../../button';
import Field from '../../field';
import {Popup} from '../../popup';
import {getAllEditableElements} from '../../../../../packages/editable/utils';
import {useSlateStatic} from 'slate-react';

type DisplayFlagPopupProps = {
	coordinates: StencylPopupCoordinates;
	isVisible: boolean;
	onRequestClose: () => void;
	onSubmit: (condition: StencylDisplayCondition) => void;
};

const BaseDisplayFlagPopup: FC<DisplayFlagPopupProps> = ({
	coordinates: {x, y},
	isVisible,
	onRequestClose,
	onSubmit,
}) => {
	const editor = useSlateStatic();
	const editableElements = getAllEditableElements(editor);
	const matchedElements = useMemo(
		() =>
			editableElements
				.filter(
					([node]) => !node.linkId && (node.dataType === 'options' || node.dataType === 'radio'),
				)
				.map((o) => o[0]),
		[editableElements],
	);

	const [parent, setParent] = useState('');
	const [equals, setEquals] = useState('');

	const handleSelectParent = (e: ChangeEvent<HTMLSelectElement>) => {
		setParent(e.target.value);
	};

	const handleSelectEquals = (e: ChangeEvent<HTMLSelectElement>) => {
		setEquals(e.target.value);
	};

	const handleSubmit = () => {
		onSubmit({parent, value: equals});
		onRequestClose();
		setParent('');
		setEquals('');
	};

	return (
		<Popup
			position='right'
			alignment='start'
			isVisible={isVisible}
			onRequestClose={onRequestClose}
			transparent
			hideArrow
			overlayCloseOnClick
			contentClassName='border-gray-50 border-solid border bg-white rounded-lg flex items-center py-8 px-8 space-x-8 text-gray-500'
			distance={4}
			offsets={{
				y: y + 16,
				x: x,
			}}
		>
			<div className='flex items-center space-x-4'>
				<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
					When
				</div>
				<Field className='w-180'>
					<select value={parent} onChange={handleSelectParent}>
						<option hidden value=''>
							Choose one
						</option>
						{matchedElements.map((node) => (
							<option key={node.id} value={node.id}>
								{node.defaultValue}({node.label})
							</option>
						))}
					</select>
				</Field>
			</div>
			<div className='flex items-center space-x-4'>
				<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
					Equals
				</div>
				<Field className='w-144'>
					<select value={equals} onChange={handleSelectEquals}>
						<option hidden value=''>
							Choose one
						</option>
						{parent?.length &&
							(matchedElements.find((o) => o.id === parent) as any).options.map(
								(option: StencylOption) => (
									<option key={option.id} value={option.id}>
										{option.label}
									</option>
								),
							)}
					</select>
				</Field>
			</div>
			<Button onPress={handleSubmit} disabled={!parent?.length || !equals?.length} className='h-36'>
				Done
			</Button>
		</Popup>
	);
};

export const DisplayFlagPopup = memo(BaseDisplayFlagPopup);
