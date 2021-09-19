import {List, ListItem, ListItemContainer} from '../lists';
import React, {FC} from 'react';
import {Table, TableCell, TableRow} from '../table';

import {Blockquote} from '../blockquote';
import {Codeblock} from '../codeblock';
import {Editable} from '../editable';
import {Headings} from '../headings';
import {Image} from '../image';
import {Link} from '../link';
import {Paragraph} from '../paragraph';
import {PdfRenderElementProps} from '../../types';

export const PdfPreviewElement: FC<PdfRenderElementProps> = (props) => {
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
		case 'editable':
			return <Editable {...props} />;
		default:
			return null;
	}
};
