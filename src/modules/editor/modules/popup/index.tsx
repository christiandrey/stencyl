import {Content, ContentDimensions} from './content';
import React, {FC, MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';

import {createPortal} from 'react-dom';
import {useMouseDown} from '../../../../hooks';

export type AnchorRef = MutableRefObject<Element | null>;

export type PopupPosition = 'up' | 'right' | 'down' | 'left' | 'center';

export type PopupAlignment = 'start' | 'center' | 'end';

type PopupOffset = {
	x?: number;
	y?: number;
};

type PopupContentPosition = {
	x: number;
	y: number;
};

type PopupProps = {
	anchor?: string;
	anchorRef?: AnchorRef;
	contentClassName?: string;
	position?: PopupPosition;
	alignment?: PopupAlignment;
	transparent?: boolean;
	distance?: number;
	offsets?: PopupOffset;
	hideArrow?: boolean;
	isVisible?: boolean;
	overlayCloseOnClick?: boolean;
	onRequestClose: () => void;
};

const EDGE_PADDING = 12;

const getViewportWidth = () =>
	window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const getViewportHeight = () =>
	window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const getPositioningWithoutAnchor = ({
	dimensions,
	position,
	alignment,
}: {
	dimensions: ContentDimensions;
	position: PopupPosition;
	alignment: PopupAlignment;
}) => {
	const viewportWidth = getViewportWidth();
	const viewportHeight = getViewportHeight();
	const {width = 0, height = 0} = dimensions;

	let x: number, y: number;

	switch (position) {
		case 'up':
			y = 0;
			break;
		case 'down':
			y = viewportHeight - height;
			break;
		case 'center':
			y = (viewportHeight - height) / 2;
			break;
		default:
			y = 0;
			break;
	}

	switch (alignment) {
		case 'start':
			x = 0;
			break;
		case 'center':
			x = (viewportWidth - width) / 2;
			break;
		case 'end':
			x = viewportWidth - width;
			break;
		default:
			x = 0;
			break;
	}

	return {x, y};
};

const getPositioningWithAnchor = ({
	dimensions,
	anchor,
	anchorRef,
	distance,
	position,
	alignment,
}: {
	dimensions: ContentDimensions;
	anchor?: string;
	anchorRef?: AnchorRef;
	distance: number;
	position: PopupPosition;
	alignment: PopupAlignment;
}) => {
	const anchorElement = anchorRef?.current ?? (anchor ? document.querySelector(anchor) : null);
	if (!anchorElement) return getPositioningWithoutAnchor({dimensions, position, alignment});

	const {
		width: anchorWidth,
		height: anchorHeight,
		x: anchorX,
		y: anchorY,
	} = anchorElement.getBoundingClientRect();
	const {width = 0, height = 0} = dimensions;

	let x: number = 0;
	let y: number = 0;

	if (position === 'up') {
		y = anchorY - height - distance;

		switch (alignment) {
			case 'start':
				x = anchorX;
				break;
			case 'center':
				x = anchorX + anchorWidth / 2 - width / 2;
				break;
			case 'end':
				x = anchorX + anchorWidth - width;
				break;
			default:
				break;
		}
	}

	if (position === 'down') {
		y = anchorY + anchorHeight + distance;

		switch (alignment) {
			case 'start':
				x = anchorX;
				break;
			case 'center':
				x = anchorX + anchorWidth / 2 - width / 2;
				break;
			case 'end':
				x = anchorX + anchorWidth - width;
				break;
			default:
				break;
		}
	}

	if (position === 'left') {
		x = anchorX - width - distance;

		switch (alignment) {
			case 'start':
				y = anchorY;
				break;
			case 'center':
				y = anchorY + anchorHeight / 2 - height / 2;
				break;
			case 'end':
				y = anchorY + anchorHeight - height;
				break;
			default:
				break;
		}
	}

	if (position === 'right') {
		x = anchorX + anchorWidth + distance;

		switch (alignment) {
			case 'start':
				y = anchorY;
				break;
			case 'center':
				y = anchorY + anchorHeight / 2 - height / 2;
				break;
			case 'end':
				y = anchorY + anchorHeight - height;
				break;
			default:
				break;
		}
	}

	return {x, y};
};

const getValidPositioning = ({
	dimensions,
	anchor,
	anchorRef,
	distance,
	position,
	alignment,
	offsets,
}: {
	dimensions: ContentDimensions;
	anchor?: string;
	anchorRef?: AnchorRef;
	distance: number;
	position: PopupPosition;
	alignment: PopupAlignment;
	offsets?: PopupOffset;
}) => {
	const {width = 0, height = 0} = dimensions;
	const viewportWidth = getViewportWidth();
	const viewportHeight = getViewportHeight();
	let contentPosition: PopupContentPosition;

	if (!!anchor || !!anchorRef) {
		contentPosition = getPositioningWithAnchor({
			dimensions,
			anchor,
			anchorRef,
			distance,
			position,
			alignment,
		});
	} else {
		contentPosition = getPositioningWithoutAnchor({dimensions, position, alignment});
	}

	if (offsets) {
		const xOffset = offsets.x ?? 0;
		const yOffset = offsets.y ?? 0;

		contentPosition.x = contentPosition.x + xOffset;
		contentPosition.y = contentPosition.y + yOffset;
	}

	const leftEdge = EDGE_PADDING;
	const topEdge = EDGE_PADDING;
	const rightEdge = viewportWidth - width;
	const bottomEdge = viewportHeight - height;

	if (contentPosition.x <= leftEdge) contentPosition.x = leftEdge;
	if (contentPosition.y <= topEdge) contentPosition.y = topEdge;
	if (contentPosition.x >= rightEdge) contentPosition.x = rightEdge;
	if (contentPosition.y >= bottomEdge) contentPosition.y = bottomEdge;

	return contentPosition;
};

export const Popup: FC<PopupProps> = ({
	anchor,
	anchorRef,
	children,
	contentClassName,
	position = 'center',
	alignment = 'center',
	transparent = false,
	distance = 10,
	offsets,
	isVisible = false,
	hideArrow = false,
	overlayCloseOnClick = true,
	onRequestClose,
}) => {
	const portalRef = useRef<HTMLElement | null>();
	const [popupContentPosition, setPopupContentPosition] = useState<PopupContentPosition>({
		x: 0,
		y: 0,
	});

	const handleClickOverlay = useMouseDown(() => {
		if (overlayCloseOnClick) onRequestClose();
	});

	const handleKeyUp = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape' && isVisible) onRequestClose();
		},
		[isVisible, onRequestClose],
	);

	useEffect(() => {
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [isVisible, handleKeyUp]);

	useEffect(() => {
		if (!portalRef.current) {
			portalRef.current = document.getElementById('stencyl-portal');
		}
	}, [isVisible, portalRef]);

	const render = () => (
		<div className='fixed top-0 left-0 w-full h-full z-2'>
			<div
				className={
					transparent
						? 'w-full h-full absolute top-0 left-0 z-0'
						: 'w-full h-full absolute top-0 left-0 z-0 bg-blue-800 opacity-50'
				}
				onMouseDown={handleClickOverlay}
			/>
			<Content
				className={contentClassName}
				x={popupContentPosition.x}
				y={popupContentPosition.y}
				position={position}
				alignment={alignment}
				hideArrow={(!anchorRef && !anchor) || hideArrow}
				onLayoutUpdate={(dimensions) =>
					setPopupContentPosition(
						getValidPositioning({
							dimensions,
							anchor,
							anchorRef,
							distance,
							position,
							alignment,
							offsets,
						}),
					)
				}
			>
				{children}
			</Content>
		</div>
	);

	if (!isVisible || !portalRef.current) return null;

	return createPortal(render(), portalRef.current);
};
