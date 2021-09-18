import React, {FC} from 'react';
import {getMatchingEditableElement, isStencylElement} from '../../../utils';

import {Descendant} from 'slate';
import {DomPreviewElement} from '../element';
import {Leaf} from '../leaf';

type SliceProps = {
	node: Descendant;
	nodes: Descendant[];
};

export const Slice: FC<SliceProps> = ({node, nodes}) => {
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
		<DomPreviewElement
			element={element}
			attributes={{
				'data-slate-node': 'element',
				ref: null,
			}}
		>
			{(element as any).children.map((o, i) => (
				<Slice key={i} node={o} nodes={nodes} />
			))}
		</DomPreviewElement>
	);
};
