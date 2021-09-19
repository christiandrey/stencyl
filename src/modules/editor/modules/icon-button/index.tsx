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
				's-32 rounded-lg bg-transparent cursor-pointer flex items-center justify-center transition-colors duration-250 hover:bg-blue-100 hover:text-blue-500',
				{
					'text-gray-500': !active,
					'text-blue-500 bg-blue-highlight': active,
					'pointer-events-none opacity-50': disabled,
					[css.tooltip]: !!tip?.length,
				},
				className,
			)}
		>
			<Icon className='s-20'>{children}</Icon>
		</div>
	);
};

export const IconButton = forwardRef(BaseIconButton);
