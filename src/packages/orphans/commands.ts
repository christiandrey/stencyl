import {EditableElement} from '../../types';
import {orphansHookState} from '.';

export function insertOrphanElement(element: EditableElement) {
	orphansHookState.set((o) => ({...o, [element.id]: {...element, isOrphan: true}}));
}

export function removeOrphanElement(id: string) {
	orphansHookState.set((o) => {
		const eventualState = {...o};
		delete eventualState[id];
		return eventualState;
	});
}

export function updateOrphanElement(
	id: string,
	attributes: Omit<EditableElement, 'type' | 'id' | 'children' | 'editable' | 'dataType'>,
) {
	orphansHookState.set((o) => {
		const eventualState = {...o};
		const element = eventualState[id];

		if (element) {
			eventualState[id] = {
				...element,
				...attributes,
			};
		}

		return eventualState;
	});
}
