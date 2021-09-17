import React, {FC} from 'react';
import {getLevelByElementType, getMatchingEditableElement, isStencylElement} from '../../../utils';

import {Descendant} from 'slate';
import {Leaf} from '../leaf';
import {PdfPreviewElement} from '../element';
import {StencylElementTypes} from '../../../../..';

type SliceProps = {
	level?: number;
	path: number[];
	parentType?: StencylElementTypes;
	node: Descendant;
	nodes: Descendant[];
};

export const Slice: FC<SliceProps> = ({level, path, node, nodes, parentType}) => {
	if (!isStencylElement(node)) {
		return (
			<Leaf text={{text: node.text}} leaf={node} attributes={{'data-slate-leaf': true}}>
				{node.text}
			</Leaf>
		);
	}

	const element =
		node.type === 'editable' && node.linkId ? getMatchingEditableElement(nodes, node.linkId) : node;

	if (!element) {
		return null;
	}

	return (
		<PdfPreviewElement
			element={element}
			attributes={{
				'data-slate-node': 'element',
				ref: null,
			}}
			level={level}
			path={path}
			parentType={parentType}
		>
			{(element as any).children.map((o, i) => (
				<Slice
					key={i}
					level={getLevelByElementType(o, level)}
					node={o}
					nodes={nodes}
					path={[...path, i]}
					parentType={element.type}
				/>
			))}
		</PdfPreviewElement>
	);
};
