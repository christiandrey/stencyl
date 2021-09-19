import React, {memo} from 'react';

import {EditEditable} from './edit-editable';
import {EditImage} from './edit-image';
import {TableTools} from './table-tools';
import {useEditingBlock} from '../../../../hooks';

const BaseSidebar = () => {
	const editingBlock = useEditingBlock();

	if (!editingBlock) {
		return null;
	}

	const [node, path] = editingBlock;

	return (
		<div className='shadow-1 rounded-lg w-full bg-white p-16'>
			{node.type === 'table' && <TableTools entry={[node, path]} />}
			{node.type === 'image' && <EditImage entry={editingBlock} />}
			{node.type === 'editable' && <EditEditable entry={editingBlock} />}
		</div>
	);
};

export const Sidebar = memo(BaseSidebar);
