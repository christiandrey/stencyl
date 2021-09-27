import React, {memo} from 'react';

import {deserializingState} from '../../../../packages/deserialize/state';
import {useHookState} from '../../../..';

const BasePasting = () => {
	const [deserializing] = useHookState(deserializingState);

	if (!deserializing) {
		return null;
	}

	return (
		<div className='st-text-white st-rounded-default st-bg-gray-900 st-p-8 st-fixed st-bottom-16'>
			Pasting content...
		</div>
	);
};

export const Pasting = memo(BasePasting);
