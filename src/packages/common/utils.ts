import {
	Descendant,
	Editor,
	Element,
	Location,
	Node,
	NodeEntry,
	NodeMatch,
	Path,
	Range,
	Text,
	Transforms,
} from 'slate';
import {EditableElement, StencylEditor, StencylElementTypes, StencylMarks} from '../../types';

export const EMPTY_TEXT_NODE = [{text: ''}];

export const getEmptyTextNode = () => [{text: ''}];

export function getLastChild(node: Descendant, level: number = 1): Descendant {
	if (!(level + 1) || !(Editor.isEditor(node) || Element.isElement(node))) {
		return node;
	}

	const {children} = node;

	const lastNode = children[children.length - 1];

	return getLastChild(lastNode, level - 1);
}

export function getLastChildEntry(entry: NodeEntry): NodeEntry<Node> | null {
	const [node, path] = entry;

	if (Text.isText(node) || !node.children.length) {
		return null;
	}

	const {children} = node;
	const lastNode = children[children.length - 1];

	return [lastNode, [...path, node.children.length - 1]];
}

export function getLastNode(
	editor: StencylEditor,
	level: number,
): NodeEntry<Descendant> | undefined {
	const {children} = editor;
	const lastNode = children[children.length - 1];

	if (!lastNode) {
		return undefined;
	}

	const [, lastPath] = Editor.last(editor, []);

	return [getLastChild(lastNode, level - 1), lastPath.slice(0, level + 1)];
}

export function getParentNode(editor: StencylEditor, nodeEntry: NodeEntry) {
	const [node, path] = nodeEntry;

	if (Editor.isEditor(node) || !path?.length) {
		return null;
	}

	return Editor.node(editor, path.slice(0, path.length - 1));

	/**
	 * Other Alternative methods
	 * 1. Editor.above(editor, {at: path});
	 * 2. Editor.parent(editor, path, {depth: path.length})
	 */
}

export function getCurrentBlock(editor: StencylEditor, mode: 'highest' | 'lowest' = 'highest') {
	const {selection} = editor;

	if (!selection) {
		return null;
	}

	if (mode === 'highest') {
		return Editor.node(editor, selection, {depth: 1});
	}

	const [match] = Editor.nodes(editor, {
		match: (node) => Element.isElement(node) && !editor.isInline(node),
		mode: 'lowest',
	});

	return match;
}

export function getSelectionBlocks(editor: StencylEditor) {
	const matches = getMatchingNodes(
		editor,
		(node) => Element.isElement(node) && !editor.isInline(node),
	);

	return Array.from(matches);
}

export function getSelectionMarks(editor: StencylEditor) {
	const editorMarks = Editor.marks(editor) ?? {};
	const record: Partial<Record<keyof StencylMarks, Array<StencylMarks[keyof StencylMarks]>>> = {};

	for (const mark in editorMarks) {
		if (Object.prototype.hasOwnProperty.call(editorMarks, mark)) {
			const value = editorMarks[mark];
			record[mark] = [value];
		}
	}

	const matches = Editor.nodes<EditableElement>(editor, {
		match: (node) => isEditableElement(editor, node),
		voids: true,
	});

	for (const [node] of matches) {
		const marks = node.marks;

		for (const mark in marks) {
			if (Object.prototype.hasOwnProperty.call(marks, mark)) {
				const value = marks[mark];

				if (record[mark]) {
					record[mark].push(value);
				}
			}
		}
	}

	const mergedMarks: StencylMarks = {};

	for (const key in record) {
		if (Object.prototype.hasOwnProperty.call(record, key)) {
			const value = record[key];
			const markActive = value.length && value.every((o: any) => !!o);

			if (markActive) {
				if (key === 'condition' || key === 'color') {
					mergedMarks[key] = value[0];
				} else {
					mergedMarks[key] = true;
				}
			}
		}
	}

	return mergedMarks;
}

export function getSelectionLeaf(editor: StencylEditor) {
	if (!editor.selection) {
		return null;
	}

	return Editor.leaf(editor, editor.selection);
}

export function isBlockActive(editor: StencylEditor, type: StencylElementTypes) {
	const matches = getMatchingNodes(
		editor,
		(node) => Element.isElement(node) && !editor.isInline(node) && node.type === type,
	);

	return !!Array.from(matches).length;
}

export function isMarkActive(
	editor: StencylEditor,
	mark: keyof StencylMarks,
	marks?: StencylMarks,
) {
	// marks = marks ?? getSelectionMarks(editor);
	// return !!marks[mark];
	const editorMarks = marks ?? Editor.marks(editor) ?? {};

	const matches = Editor.nodes(editor, {
		match: (node) => isEditableElement(editor, node) && !!node.marks[mark],
	});

	return editorMarks[mark] || !!Array.from(matches).length;
}

export function getMatchingNodes<T extends Node>(editor: StencylEditor, query: NodeMatch<T>) {
	return Editor.nodes(editor, {
		match: query,
	});
}

export function forEachMatchingNode<T extends Node>(
	editor: StencylEditor,
	query: NodeMatch<T>,
	callback: (match: NodeEntry<T>) => void,
) {
	const matches = getMatchingNodes(editor, query);

	for (const match of matches) {
		callback(match);
	}
}

export function isEditableElement(editor: StencylEditor, value: any): value is EditableElement {
	return editor.isVoid(value) && Element.isElement(value) && value.type === 'editable';
}

export function insertFragment(
	editor: StencylEditor,
	fragment: Node[],
	options: {
		at?: Location;
		hanging?: boolean;
		voids?: boolean;
	} = {},
) {
	Editor.withoutNormalizing(editor, () => {
		const {hanging = false, voids = false} = options;
		let {at = editor.selection} = options;

		if (!fragment.length) {
			return;
		}

		if (!at) {
			return;
		} else if (Range.isRange(at)) {
			if (!hanging) {
				at = Editor.unhangRange(editor, at);
			}

			if (Range.isCollapsed(at)) {
				at = at.anchor;
			} else {
				const [, end] = Range.edges(at);

				if (!voids && Editor.void(editor, {at: end})) {
					return;
				}

				const pointRef = Editor.pointRef(editor, end);
				Transforms.delete(editor, {at});
				at = pointRef.unref()!;
			}
		} else if (Path.isPath(at)) {
			at = Editor.start(editor, at);
		}

		if (!voids && Editor.void(editor, {at})) {
			return;
		}

		// If the insert point is at the edge of an inline node, move it outside
		// instead since it will need to be split otherwise.
		const inlineElementMatch = Editor.above(editor, {
			at,
			match: (n) => Editor.isInline(editor, n),
			mode: 'highest',
			voids,
		});

		if (inlineElementMatch) {
			const [, inlinePath] = inlineElementMatch;

			if (Editor.isEnd(editor, at, inlinePath)) {
				const after = Editor.after(editor, inlinePath)!;
				at = after;
			} else if (Editor.isStart(editor, at, inlinePath)) {
				const before = Editor.before(editor, inlinePath)!;
				at = before;
			}
		}

		const blockMatch = Editor.above(editor, {
			match: (n) => Editor.isBlock(editor, n),
			at,
			voids,
		})!;
		const [, blockPath] = blockMatch;
		const isBlockStart = Editor.isStart(editor, at, blockPath);
		const isBlockEnd = Editor.isEnd(editor, at, blockPath);
		const mergeStart = !isBlockStart || (isBlockStart && isBlockEnd);
		const mergeEnd = !isBlockEnd;
		const [, firstPath] = Node.first({children: fragment} as any, []);
		const [, lastPath] = Node.last({children: fragment} as any, []);

		const matches: NodeEntry[] = [];
		const matcher = ([n, p]: NodeEntry) => {
			if (
				mergeStart &&
				Path.isAncestor(p, firstPath) &&
				Element.isElement(n) &&
				!editor.isVoid(n) &&
				!editor.isInline(n)
			) {
				return false;
			}

			if (
				mergeEnd &&
				Path.isAncestor(p, lastPath) &&
				Element.isElement(n) &&
				!editor.isVoid(n) &&
				!editor.isInline(n)
			) {
				return false;
			}

			return true;
		};

		for (const entry of Node.nodes({children: fragment} as any, {pass: matcher})) {
			if (entry[1].length > 0 && matcher(entry)) {
				matches.push(entry);
			}
		}

		const starts: Array<Node> = [];
		const middles: Array<Node> = [];
		const ends: Array<Node> = [];
		let starting = true;
		let hasBlocks = false;

		for (const [node] of matches) {
			if (Element.isElement(node) && !editor.isInline(node)) {
				starting = false;
				hasBlocks = true;
				middles.push(node);
			} else if (starting) {
				starts.push(node);
			} else {
				ends.push(node);
			}
		}

		const [inlineMatch] = Editor.nodes(editor, {
			at,
			match: (n) => Text.isText(n) || Editor.isInline(editor, n),
			mode: 'highest',
			voids,
		})!;

		const [, inlinePath] = inlineMatch;
		const isInlineStart = Editor.isStart(editor, at, inlinePath);
		const isInlineEnd = Editor.isEnd(editor, at, inlinePath);

		const middleRef = Editor.pathRef(editor, isBlockEnd ? Path.next(blockPath) : blockPath);

		const endRef = Editor.pathRef(editor, isInlineEnd ? Path.next(inlinePath) : inlinePath);

		Transforms.splitNodes(editor, {
			at,
			match: (n) =>
				hasBlocks ? Editor.isBlock(editor, n) : Text.isText(n) || Editor.isInline(editor, n),
			mode: hasBlocks ? 'lowest' : 'highest',
			voids,
		});

		const startRef = Editor.pathRef(
			editor,
			!isInlineStart || (isInlineStart && isInlineEnd) ? Path.next(inlinePath) : inlinePath,
		);

		Transforms.insertNodes(editor, starts, {
			at: startRef.current!,
			match: (n) => Text.isText(n) || Editor.isInline(editor, n),
			mode: 'highest',
			voids,
		});

		Transforms.insertNodes(editor, middles, {
			at: middleRef.current!,
			match: (n) => Editor.isBlock(editor, n),
			mode: 'lowest',
			voids,
		});

		Transforms.insertNodes(editor, ends, {
			at: endRef.current!,
			match: (n) => Text.isText(n) || Editor.isInline(editor, n),
			mode: 'highest',
			voids,
		});

		if (!options.at) {
			let path: Path;

			if (ends.length > 0) {
				path = Path.previous(endRef.current!);
			} else if (middles.length > 0) {
				path = Path.previous(middleRef.current!);
			} else {
				path = Path.previous(startRef.current!);
			}

			const end = Editor.end(editor, path);
			Transforms.select(editor, end);
		}

		startRef.unref();
		middleRef.unref();
		endRef.unref();
	});
}

export function getNextPath(path: Path, steps = 1): Path {
	return [...path.slice(0, -1), path.slice(-1)[0] + steps];
}

export function getPreviousPath(path: Path, steps = 1): Path {
	return getNextPath(path, Math.abs(steps) * -1);
}

export function getNodeAt(
	editor: StencylEditor,
	at: Location,
	options: {
		match?: NodeMatch<Node>;
		mode?: 'highest' | 'lowest' | 'all';
	} = {},
): NodeEntry<Node> | null {
	const {match, mode} = options;
	try {
		if (match) {
			const [matched] = Editor.nodes(editor, {
				at,
				match,
				mode,
			});
			return matched;
		} else {
			return Editor.node(editor, at);
		}
	} catch (error) {
		return null;
	}
}

export function moveCaretTo(editor: StencylEditor, path: Path, offset: number = 0) {
	Transforms.setSelection(editor, {
		anchor: {
			path,
			offset,
		},
		focus: {
			path,
			offset,
		},
	});
}
