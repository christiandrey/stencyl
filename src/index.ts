import 'tailwindcss/tailwind.css';

import {Editor, EditorRef} from './modules/editor';
import {getEditableElements, registerPdfFonts} from './modules/preview/utils';

import {DomPreview} from './modules/preview/dom';
import {PdfPreview} from './modules/preview/pdf';
import {generatePDFAsync} from './modules/download/pdf';

export {Editor, EditorRef};
export {DomPreview};
export {PdfPreview};
export {getEditableElements, registerPdfFonts};
export {generatePDFAsync};
export * from './types';
export {createHookState} from './packages/hookstate';
export * from './packages/hookstate/types';
export {useHookState, useHookStateStatic} from './packages/hookstate/hooks';
