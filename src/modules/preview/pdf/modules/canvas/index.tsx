import {Document, Page} from '@react-pdf/renderer';
import React, {FC, memo} from 'react';

import {Descendant} from 'slate';
import {Slice} from '../slice';
import {getLevelByElementType} from '../../../utils';
import {styles} from '../../styles';

type CanvasProps = {
	author?: string;
	title?: string;
	fontFamily?: string;
	nodes: Array<Descendant>;
};

const BaseCanvas: FC<CanvasProps> = ({author, title, fontFamily, nodes}) => {
	return (
		<Document author={author} title={title} creator={author} producer={author}>
			<Page size='A4' style={[styles.page, {fontFamily}]}>
				{nodes.map((node, i) => (
					<Slice key={i} level={getLevelByElementType(node)} node={node} nodes={nodes} path={[i]} />
				))}
			</Page>
		</Document>
	);
};

export const Canvas = memo(BaseCanvas);
