import {generateUUID, isObjectEqual} from '../../utils';

import {Canvas} from '../preview/pdf/modules/canvas';
import {Descendant} from 'slate';
import React from 'react';
import {StencylDataset} from '../..';
import {pdf} from '@react-pdf/renderer';
import {previewDatasetState} from '../preview/state';
import {saveAs} from 'file-saver';

let CACHED_DATASET: any;
let CACHED_BLOB: Blob;

type PDFGenerationOptions = {
	dataset: StencylDataset;
	nodes: Descendant[];
	author?: string;
	enableCache?: boolean;
	fontFamily?: string;
	title?: string;
};

function getRenderedDocument(options: PDFGenerationOptions) {
	return (
		<Canvas
			author={options.author}
			title={options.title}
			fontFamily={options.fontFamily}
			nodes={options.nodes}
		/>
	);
}

export async function generatePDFAsync(options: PDFGenerationOptions) {
	const {dataset} = options;
	const useCache = isObjectEqual(dataset, CACHED_DATASET);

	if (!useCache) {
		const renderedDocument = getRenderedDocument(options);
		previewDatasetState.set(dataset);

		if (options.enableCache) {
			CACHED_DATASET = dataset;
		}

		CACHED_BLOB = await pdf(renderedDocument).toBlob();
	}

	if (CACHED_BLOB) {
		saveAs(CACHED_BLOB, `${options.title ?? generateUUID()}.pdf`);
	}
}
