import React, {FC, useEffect, useRef} from 'react';

import {Canvas} from './modules/canvas';
import {Descendant} from 'slate';
import {StencylDataset} from '../../../types';
import {previewDatasetState} from '../state';

type DomPreviewProps = {
	className?: string;
	nodes: Descendant[];
	dataset: StencylDataset;
};

export const DomPreview: FC<DomPreviewProps> = ({className, nodes, dataset}) => {
	const nodesRef = useRef(nodes);

	useEffect(() => {
		previewDatasetState.set(dataset);
	}, [dataset]);

	return <Canvas className={className} nodes={nodesRef.current} />;
};
