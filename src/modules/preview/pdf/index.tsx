import React, {FC, useEffect, useRef} from 'react';

import {Canvas} from './modules/canvas';
import {Descendant} from 'slate';
import {PDFViewer} from '@react-pdf/renderer';
import {StencylDataset} from '../../../types';
import constants from '../../../constants';
import {previewDatasetState} from '../state';

type PdfPreviewProps = {
	author?: string;
	title?: string;
	fontFamily?: string;
	width?: number;
	height?: number;
	nodes: Descendant[];
	dataset: StencylDataset;
};

export const PdfPreview: FC<PdfPreviewProps> = ({
	author,
	title,
	fontFamily,
	width,
	height,
	nodes,
	dataset,
}) => {
	const nodesRef = useRef(nodes);

	useEffect(() => {
		previewDatasetState.set(dataset);
	}, [dataset]);

	return (
		<PDFViewer
			width={width ?? constants.paperSizes.a4.width}
			height={height ?? constants.paperSizes.a4.height}
		>
			<Canvas author={author} title={title} fontFamily={fontFamily} nodes={nodesRef.current} />
		</PDFViewer>
	);
};
