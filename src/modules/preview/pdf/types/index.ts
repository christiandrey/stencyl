import {RenderElementProps, RenderLeafProps} from 'slate-react';

import {StencylElementTypes} from '../../../..';

export type NodeExtraProps = {
	level?: number;
	path: Array<number>;
	parentType?: StencylElementTypes;
};

export type PdfRenderElementProps = RenderElementProps & NodeExtraProps;

export type PdfRenderLeafProps = RenderLeafProps;
