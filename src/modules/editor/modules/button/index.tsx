import React, {FC, PropsWithChildren, memo} from 'react';

import classnames from 'classnames';

type ButtonProps = PropsWithChildren<{
	className?: string;
	disabled?: boolean;
	onPress?: Fn;
}>;

const BaseButton: FC<ButtonProps> = ({children, className, disabled, onPress}) => {
	return (
		<button
			role='button'
			onClick={onPress}
			className={classnames(
				'st-border-transparent st-rounded-lg st-font-medium st-cursor-pointer st-text-white st-px-18 st-flex st-items-center st-justify-center st-transition-colors st-duration-250 hover:st-bg-blue-600',
				{
					'st-bg-blue-500': !disabled,
					'st-pointer-events-none st-bg-blue-300': disabled,
					'st-h-36': !/\bst-h-[0-9]/gi.test(className ?? ''),
				},
				className,
			)}
		>
			{children}
		</button>
	);
};

export const Button = memo(BaseButton);
