import React from 'react';
import {shallow, mount} from 'enzyme';

import Keypad from './Keypad';

describe('<Keypad />', () => {
	let wrapper, wrapperInstance;

	beforeEach(() => {
		wrapper = shallow(<Keypad
			callOperator = {jest.fn()}
		  setOperator = {jest.fn()}
		  updateDisplay = {jest.fn()}
		  numbers = {[]}
		  operators = {[]}
		/>);

		wrapperInstance = wrapper.instance();
	});

	it('should render 4 divs', () => {
		expect(wrapper.find('div').length).toEqual(4);
	});

	it('should render instances of Key for all numbers, operators and submit Key', () => {
		const numbers = ['0', '1', '2', '3', '4', '5'];
		const operators = ['+', '-', '*', '/'];
		const submit = 1;
		const totalKeys = numbers.length + operators.length + submit;

		wrapper.setProps({numbers, operators});
		expect(wrapper.find('Key').length).toEqual(totalKeys);
	});
});

describe('mounted <Keypad />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Keypad
			callOperator = {jest.fn()}
			setOperator = {jest.fn()}
			updateDisplay = {jest.fn()}
			numbers = {[]}
			operators = {[]}
		/>);
	});

	it('should render value of numbers', () => {
		wrapper.setProps({numbers: ['0', '1', '2', '3', '4', '5']});

		expect(wrapper.find('.numbers-container').text()).toEqual('012345');
	});

	it('should render value of operators', () => {
		wrapper.setProps({operators: ['+', '-', '*', '/']});

		expect(wrapper.find('.operators-container').text()).toEqual('+-*/');
	});
});