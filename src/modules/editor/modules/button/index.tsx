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
				'border-transparent rounded-lg font-medium cursor-pointer text-white px-18 flex items-center justify-center transition-colors duration-250 hover:bg-blue-600',
				{
					'bg-blue-500': !disabled,
					'pointer-events-none bg-blue-300': disabled,
					'h-36': !/\bh-[0-9]/gi.test(className ?? ''),
				},
				className,
			)}
		>
			{children}
		</button>
	);
};

export const Button = memo(BaseButton);
