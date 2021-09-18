import {EditableElement} from '../../types';
import {createHookState} from '../hookstate';

export const orphansHookState = createHookState<Record<string, EditableElement>>({});
