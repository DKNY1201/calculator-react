import React from 'react';
import {shallow} from 'enzyme';

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

	it('should render 3 divs', () => {
		expect(wrapper.find('div').length).toEqual(3);
	});

	it('should render value of numbers', () => {
		expect(wrapper.setProps({
			numbers: [0,1,2,3,4,5]
		}).text()).toEqual('012345');
	});

	it('should render value of operators', () => {
		expect(wrapper.setProps({
			operators: ['+', '-', '*', '/']
		}).text()).toEqual('+-*/');
	});

	it('should render an instance of Key component', () => {
		expect(wrapper.find('Key').length).toEqual(1);
	});
});