import React, {Children, FC, PropsWithChildren, ReactElement, cloneElement, memo} from 'react';

import classNames from 'classnames';
import {useMouseDown} from '../../../../hooks';

type IconProps = PropsWithChildren<{
	className?: string;
	onPress?: Fn;
}>;

const BaseIcon: FC<IconProps> = ({children, className, onPress}) => {
	const handlePress = useMouseDown(onPress);
	return (
		<figure
			onMouseDown={handlePress}
			className={classNames('flex-shrink-0', className, {
				's-16': !/\bs-[0-9]/gi.test(className ?? ''),
			})}
		>
			{Children.map(children, (child: ReactElement) =>
				child
					? cloneElement(child, {
							className: classNames(
								child.props.className,
								'h-full w-full object-contain  object-center m-auto pointer-events-none',
							),
					  })
					: child,
			)}
		</figure>
	);
};

const Icon = memo(BaseIcon);

export default Icon;
