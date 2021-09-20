import React, {FC} from 'react';

import classnames from 'classnames';

type IconGroupProps = {
	className?: string;
};

const IconGroup: FC<IconGroupProps> = ({className, children}) => {
	return (
		<div className={classnames('st-flex st-items-center st-space-x-4', className)}>{children}</div>
	);
};

IconGroup.defaultProps = {
	className: 'st-px-16',
};

export default IconGroup;
