import React, {Children, FC, PropsWithChildren, ReactElement, cloneElement} from 'react';

import classNames from 'classnames';

type FieldProps = PropsWithChildren<{
	label?: string;
	className?: string;
}>;

const Field: FC<FieldProps> = ({className, children, label}) => {
	return (
		<div className={className}>
			{!!label?.length && (
				<label className='st-text-blue-500 st-block st-mb-4 st-text-subhead st-font-medium'>
					{label}
				</label>
			)}
			{Children.map(children, (child: ReactElement) =>
				cloneElement(child, {
					className: classNames(
						child.props.className,
						'st-w-full st-appearance-none st-border st-border-gray-200 st-rounded-lg st-h-36 st-px-8 st-transition:colors st-transition:shadow st-duration-250 focus:st-border-blue-500 focus:st-shadow-outline',
					),
				}),
			)}
		</div>
	);
};

export default Field;
