import {List, ListItem, ListItemContainer} from '../../../../packages/lists';
import React, {FC} from 'react';
import {Table, TableCell, TableRow} from '../../../../packages/table';

import {Blockquote} from '../../../../packages/blockquote';
import {Codeblock} from '../../../../packages/codeblock';
import {Headings} from '../../../../packages/headings';
import {Image} from '../../../../packages/image';
import {Link} from '../../../../packages/link';
import {Paragraph} from '../../../../packages/paragraph';
import {RenderElementProps} from 'slate-react';

export const EditorElement: FC<RenderElementProps> = (props) => {
	switch (props.element.type) {
		case 'block-quote':
			return <Blockquote {...props} />;
		case 'bulleted-list':
		case 'numbered-list':
			return <List {...props} />;
		case 'code-block':
			return <Codeblock {...props} />;
		case 'heading-one':
		case 'heading-two':
		case 'heading-three':
		case 'heading-four':
		case 'heading-five':
		case 'heading-six':
			return <Headings {...props} />;
		case 'image':
			return <Image {...props} />;
		case 'link':
			return <Link {...props} />;
		case 'list-item':
			return <ListItem {...props} />;
		case 'list-item-container':
			return <ListItemContainer {...props} />;
		case 'paragraph':
			return <Paragraph {...props} />;
		case 'table':
			return <Table {...props} />;
		case 'table-cell':
			return <TableCell {...props} />;
		case 'table-row':
			return <TableRow {...props} />;
		default:
			return null;
	}
};
