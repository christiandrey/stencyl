import React, {memo} from 'react';

import {AlignCenterButton} from './modules/align-center';
import {AlignJustifiedButton} from './modules/align-justified';
import {AlignLeftButton} from './modules/align-left';
import {AlignRightButton} from './modules/align-right';
import {BoldButton} from './modules/bold';
import {BulletedListButton} from './modules/bulleted-list';
import {ClearFormattingButton} from './modules/clear-formatting';
import {DisplayFlagButton} from './modules/display-flag';
import IconGroup from '../icon-group';
import {IndentDecreaseButton} from './modules/indent-decrease';
import {IndentIncreaseButton} from './modules/indent-increase';
import {InsertEditableButton} from './modules/insert-editable';
import {InsertLinkButton} from './modules/insert-link';
import {InsertPhotoButton} from './modules/insert-photo';
import {InsertTableButton} from './modules/insert-table';
import {ItalicButton} from './modules/italic';
import {NumberedListButton} from './modules/numbered-list';
import {RedoButton} from './modules/redo';
import {StrikethroughButton} from './modules/strikethrough';
import {TextStyleButton} from './modules/text-style';
import {UnderlineButton} from './modules/underline';
import {UndoButton} from './modules/undo';

const BaseToolbar = () => {
	return (
		<div className='st-flex st-items-center st-justify-between st-px-60 st-py-16 st-bg-white'>
			<div className='st-flex st-items-center st-divide-x st-divide-gray-100'>
				<IconGroup>
					<UndoButton />
					<RedoButton />
				</IconGroup>
				<IconGroup>
					<TextStyleButton />
				</IconGroup>
				<IconGroup>
					<BoldButton />
					<ItalicButton />
					<UnderlineButton />
					<StrikethroughButton />
				</IconGroup>
				<IconGroup>
					<AlignLeftButton />
					<AlignCenterButton />
					<AlignRightButton />
					<AlignJustifiedButton />
				</IconGroup>
				<IconGroup>
					<IndentDecreaseButton />
					<IndentIncreaseButton />
				</IconGroup>
				<IconGroup>
					<BulletedListButton />
					<NumberedListButton />
				</IconGroup>
				<IconGroup>
					<InsertTableButton />
					<InsertPhotoButton />
					<InsertLinkButton />
					<InsertEditableButton />
					<DisplayFlagButton />
				</IconGroup>
			</div>
			<div>
				<ClearFormattingButton />
			</div>
		</div>
	);
};

export const Toolbar = memo(BaseToolbar);
