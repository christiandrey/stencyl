import {DATE_FORMATS, TIME_FORMATS} from '../../../../../constants/datetime';
import {EditableElement, ImageElement, TableElement} from '../../../../../types';
import React, {
	ChangeEvent,
	FC,
	Fragment,
	KeyboardEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import {formatDate, generateUUID, isEnterKey} from '../../../../../utils';

import Field from '../../field';
import {NodeEntry} from 'slate';
import {Options} from '../../options';
import Switch from '../../switch';
import {updateInlineEditable} from '../../../../../packages/editable/commands';
import {useSlateStatic} from 'slate-react';

type EditEditableProps = {
	entry: NodeEntry<ImageElement | TableElement | EditableElement>;
};

const BaseEditEditable: FC<EditEditableProps> = ({entry}) => {
	const now = useRef(Date.now());
	const editor = useSlateStatic();
	const [node, path] = entry;

	if (node.type !== 'editable') {
		return null;
	}

	const [attributes, setAttributes] = useState(node);

	useEffect(() => {
		setAttributes(node);
	}, [node]);

	const persistChanges = (patch: Partial<EditableElement> = {}) => {
		const current: Partial<EditableElement> = {...attributes, ...patch};
		current.label = current.label?.length ? current.label : undefined;
		current.tip = current.tip?.length ? current.tip : undefined;

		updateInlineEditable(editor, current, [node, path]);
	};

	const handleBlurInput = () => {
		persistChanges();
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (isEnterKey(e)) {
			persistChanges();
		}
	};

	const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
		const label = e.target?.value ?? '';
		setAttributes((o) => ({...o, label}));
	};

	const handleChangeMultiline = (value: boolean) => {
		setAttributes((o) => ({...o, multiline: value}));
		persistChanges({multiline: value});
	};

	const handleChangeTip = (e: ChangeEvent<HTMLInputElement>) => {
		const tip = e.target?.value ?? '';
		setAttributes((o) => ({...o, tip}));
	};

	const handleChangeDateTimeFormat = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			const value = e.target.value;
			setAttributes((o) => ({...o, dateTimeFormat: value}));
			persistChanges({dateTimeFormat: value});
		},
		[persistChanges],
	);

	const handleChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
		if (attributes.dataType !== 'image') {
			return;
		}

		const parsedValue = parseInt(e.target.value);
		const eventualWidth = isNaN(parsedValue) || parsedValue < 1 ? attributes.width : parsedValue;
		setAttributes((o) => ({...o, width: eventualWidth}));
	};

	const handleChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
		if (attributes.dataType !== 'image') {
			return;
		}

		const parsedValue = parseInt(e.target.value);
		const eventualHeight = isNaN(parsedValue) || parsedValue < 1 ? attributes.height : parsedValue;
		setAttributes((o) => ({...o, height: eventualHeight}));
	};

	const handleCreateOption = (text: string) => {
		if (attributes.dataType !== 'options' && attributes.dataType !== 'radio') {
			return;
		}

		const id = generateUUID();
		const eventualValue = [...attributes.options, {id, label: text}];

		setAttributes((o) => ({...o, options: eventualValue}));
		persistChanges({options: eventualValue});
	};

	const handleDeleteOption = useCallback((id: string) => {
		if (attributes.dataType !== 'options' && attributes.dataType !== 'radio') {
			return;
		}

		const eventualValue = [...attributes.options];
		const index = eventualValue.findIndex((o) => o.id === id);

		if (!~index) {
			return;
		}

		eventualValue.splice(index, 1);
		setAttributes((o) => ({...o, options: eventualValue}));
		persistChanges({options: eventualValue});
	}, []);

	return (
		<div>
			<div className='text-headline text-blue-500 mb-8'>Editable {attributes.dataType}</div>
			<div className='text-gray-500 mb-24 text-subhead'>
				Configure properties of editable elements, which show up as form elements to users.
			</div>
			<div className='space-y-16'>
				<Field label='Question'>
					<input
						type='text'
						placeholder='Type a question here...'
						value={attributes.label}
						onChange={handleChangeLabel}
						onBlur={handleBlurInput}
						onKeyDown={handleKeyDown}
					/>
				</Field>
				{attributes.linkId || (
					<Fragment>
						{attributes.dataType === 'text' && (
							<div className='flex items-center justify-between'>
								<div>Multiline text</div>
								<Switch value={!!attributes.multiline} onChangeValue={handleChangeMultiline} />
							</div>
						)}
						{attributes.dataType === 'image' && (
							<Fragment>
								<div className='flex items-center justify-between'>
									<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
										Width
									</div>
									<Field className='w-120'>
										<input
											type='number'
											placeholder='0'
											min={1}
											value={attributes.width}
											onChange={handleChangeWidth}
											onBlur={handleBlurInput}
											onKeyDown={handleKeyDown}
										/>
									</Field>
								</div>
								<div className='flex items-center justify-between'>
									<div className='bg-gray-500 text-footnote font-medium rounded-default px-8 py-4 text-white uppercase'>
										Height
									</div>
									<Field className='w-120'>
										<input
											type='number'
											placeholder='0'
											min={1}
											value={attributes.height}
											onChange={handleChangeHeight}
											onBlur={handleBlurInput}
											onKeyDown={handleKeyDown}
										/>
									</Field>
								</div>
							</Fragment>
						)}
						{attributes.dataType === 'date' && (
							<Field label='Date format'>
								<select value={attributes.dateTimeFormat} onChange={handleChangeDateTimeFormat}>
									<option hidden value=''>
										Choose one
									</option>
									{DATE_FORMATS.map((o) => (
										<option value={o} key={o}>
											{formatDate(now.current, o)}
										</option>
									))}
								</select>
							</Field>
						)}
						{attributes.dataType === 'time' && (
							<Field label='Time format'>
								<select value={attributes.dateTimeFormat} onChange={handleChangeDateTimeFormat}>
									<option hidden value=''>
										Choose one
									</option>
									{TIME_FORMATS.map((o) => (
										<option value={o} key={o}>
											{formatDate(now.current, o)}
										</option>
									))}
								</select>
							</Field>
						)}
						<Field label='Description'>
							<input
								type='text'
								placeholder='Type a description here'
								value={attributes.tip ?? ''}
								onChange={handleChangeTip}
								onBlur={handleBlurInput}
								onKeyDown={handleKeyDown}
							/>
						</Field>
						{(attributes.dataType === 'options' || attributes.dataType === 'radio') && (
							<Options
								label='Options'
								options={attributes.options}
								onCreateOption={handleCreateOption}
								onDeleteOption={handleDeleteOption}
							/>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export const EditEditable = memo(BaseEditEditable);
