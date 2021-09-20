import React, {FC, memo} from 'react';

import {ToggleSlider} from 'react-toggle-slider';

type SwitchProps = {
	className?: string;
	value: boolean;
	onChangeValue: (value: boolean) => void;
};

const BaseSwitch: FC<SwitchProps> = ({className, value, onChangeValue}) => {
	return (
		<ToggleSlider
			active={value}
			onToggle={onChangeValue}
			barBackgroundColor='#ADC5FA'
			barBackgroundColorActive='#326FF3'
			barHeight={26}
			barWidth={44}
		/>
	);
};

const Switch = memo(BaseSwitch);

export default Switch;
