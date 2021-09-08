import React, {memo} from 'react';

import {ReactComponent as BorderNone} from '../../../../../assets/images/icon-border-none.svg';
import {ReactComponent as ColumnInsertLeft} from '../../../../../assets/images/icon-column-insert-left.svg';
import {ReactComponent as ColumnInsertRight} from '../../../../../assets/images/icon-column-insert-right.svg';
import Icon from '../../icon';
import {ReactComponent as LayoutList} from '../../../../../assets/images/icon-layout-list.svg';
import {ReactComponent as RowInsertBottom} from '../../../../../assets/images/icon-row-insert-bottom.svg';
import {ReactComponent as RowInsertTop} from '../../../../../assets/images/icon-row-insert-top.svg';
import {ReactComponent as Trash} from '../../../../../assets/images/icon-trash.svg';

const BaseTableTools = () => {
	return (
		<div>
			<div className='text-headline text-blue-500 mb-8'>Table tools</div>
			<div className='text-gray-500 mb-8 text-subhead'>
				Use these tools to add or modify features on the table.
			</div>
			<div className='space-y-8'>
				<div className='flex space-x-8'>
					<div className='flex-1 space-y-8'>
						<div className='h-36 px-6 flex items-center space-x-4 w-full bg-gray-100 text-gray-500 rounded-default cursor-pointer transition-colors duration-125 hover:bg-gray-200'>
							<Icon className='s-16'>
								<RowInsertTop />
							</Icon>
							<div className='font-medium text-subhead'>Add row above</div>
						</div>
						<div className='h-36 px-6 flex items-center space-x-4 w-full bg-gray-100 text-gray-500 rounded-default cursor-pointer transition-colors duration-125 hover:bg-gray-200'>
							<Icon className='s-16'>
								<ColumnInsertLeft />
							</Icon>
							<div className='font-medium text-subhead'>Add column left</div>
						</div>
						<div className='h-36 px-6 flex items-center space-x-4 w-full bg-gray-100 text-gray-500 rounded-default cursor-pointer transition-colors duration-125 hover:bg-gray-200'>
							<Icon className='s-16'>
								<LayoutList />
							</Icon>
							<div className='font-medium text-subhead'>Delete row</div>
						</div>
						<div className='h-36 px-6 flex items-center space-x-4 w-full bg-gray-100 text-gray-500 rounded-default cursor-pointer transition-colors duration-125 hover:bg-gray-200'>
							<Icon className='s-16'>
								<BorderNone />
							</Icon>
							<div className='font-medium text-subhead'>Toggle borders</div>
						</div>
					</div>
					<div className='flex-1 space-y-8'>
						<div className='h-36 px-6 flex items-center space-x-4 w-full bg-gray-100 text-gray-500 rounded-default cursor-pointer transition-colors duration-125 hover:bg-gray-200'>
							<Icon className='s-16'>
								<RowInsertBottom />
							</Icon>
							<div className='font-medium text-subhead'>Add row below</div>
						</div>
						<div className='h-36 pl-6 flex items-center space-x-4 w-full bg-gray-100 text-gray-500 rounded-default cursor-pointer transition-colors duration-125 hover:bg-gray-200'>
							<Icon className='s-16'>
								<ColumnInsertRight />
							</Icon>
							<div className='font-medium text-subhead'>Add column right</div>
						</div>
						<div className='h-36 px-6 flex items-center space-x-4 w-full bg-gray-100 text-gray-500 rounded-default cursor-pointer transition-colors duration-125 hover:bg-gray-200'>
							<Icon className='s-16 transform rotate-90'>
								<LayoutList />
							</Icon>
							<div className='font-medium text-subhead'>Delete column</div>
						</div>
						<div className='h-36 px-6 flex items-center space-x-4 w-full bg-red-300 text-white rounded-default cursor-pointer transition-colors duration-125 hover:bg-red-400'>
							<Icon className='s-16'>
								<Trash />
							</Icon>
							<div className='font-medium text-subhead'>Delete table</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const TableTools = memo(BaseTableTools);
