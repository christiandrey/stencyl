import 'tailwindcss/tailwind.css';

export {Editor, EditorRef} from './modules/editor';
export {DomPreview} from './modules/preview/dom';
export {PdfPreview} from './modules/preview/pdf';
export {getEditableElements, registerPdfFonts} from './modules/preview/utils';
export {generatePDFAsync} from './modules/download/pdf';
export * from './types';
