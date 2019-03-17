import React from 'react';
import { shallow } from 'enzyme';

import Calculator from './Calculator';
import Display from '../../components/Display/Display';
import Keypad from '../../components/Keypad/Keypad';

describe('<Calculator />', () => {
	let wrapper;
	let wrapperInstance;

	beforeEach(() => {
		wrapper = shallow(<Calculator />);
		wrapperInstance = wrapper.instance();
	});

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot();
	})

	it('should render a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});

	it('should render a Display component and a Keypad component', () => {
		expect(wrapper.containsAllMatchingElements(
			[
				<Display displayValue={wrapperInstance.state.displayValue}/>,
				<Keypad
					callOperator = {wrapperInstance.callOperator}
				  setOperator = {wrapperInstance.setOperator}
				  updateDisplay = {wrapperInstance.updateDisplay}
				  numbers = {wrapperInstance.state.numbers}
					operators = {wrapperInstance.state.operators}
				/>
			]
		)).toEqual(true);
	});
});