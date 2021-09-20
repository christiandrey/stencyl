import React, {CSSProperties, MouseEventHandler, ReactNode, Ref, forwardRef} from 'react';

import Icon from '../icon';
import classNames from 'classnames';
import css from './style.module.css';

type IconButtonProps = {
	active?: boolean;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
	tip?: string;
	onPress?: MouseEventHandler;
	children?: ReactNode;
};

const BaseIconButton = (
	{active, disabled, className, children, onPress, style, tip}: IconButtonProps,
	ref: Ref<HTMLDivElement>,
) => {
	const handleMouseDown: MouseEventHandler = (e) => {
		e.preventDefault();
		onPress?.(e);
	};
	return (
		<div
			style={style}
			role='button'
			ref={ref}
			data-tip={tip}
			onMouseDown={handleMouseDown}
			className={classNames(
				'st-s-32 st-rounded-lg st-bg-transparent st-cursor-pointer st-flex st-items-center st-justify-center st-transition-colors st-duration-250 hover:st-bg-blue-100 hover:st-text-blue-500',
				{
					'st-text-gray-500': !active,
					'st-text-blue-500 st-bg-blue-highlight': active,
					'st-pointer-events-none st-opacity-50': disabled,
					[css.tooltip]: !!tip?.length,
				},
				className,
			)}
		>
			<Icon className='st-s-20'>{children}</Icon>
		</div>
	);
};

export const IconButton = forwardRef(BaseIconButton);
