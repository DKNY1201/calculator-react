import React from 'react';
import { shallow, mount } from 'enzyme';

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

describe('mounted <Calculator />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Calculator/>);
	});

	it('should calls updateDisplay when a number key is clicked', () => {
		const spy = jest.spyOn(wrapper.instance(), 'updateDisplay');
		wrapper.instance().forceUpdate();
		expect(spy).toHaveBeenCalledTimes(0);
		wrapper.find('.number-key').first().simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should calls setOperator when a operator key is clicked', () => {
		const spy = jest.spyOn(wrapper.instance(), 'setOperator');
		wrapper.instance().forceUpdate();
		expect(spy).toHaveBeenCalledTimes(0);
		wrapper.find('.operator-key').first().simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should calls callOperator operator when submit key is clicked', () => {
		const spy = jest.spyOn(wrapper.instance(), 'callOperator');
		wrapper.instance().forceUpdate();
		expect(spy).toHaveBeenCalledTimes(0);
		wrapper.find('.submit-key').first().simulate('click');
		expect(spy).toHaveBeenCalledTimes(1);
	});
});

describe('updateDisplay', () => {
	let wrapper, wrapperInstance;

	beforeEach(() => {
		wrapper = shallow(<Calculator/>);
		wrapperInstance = wrapper.instance();
	});

	it('should updates displayValue', () => {
		wrapperInstance.updateDisplay('8');
		expect(wrapperInstance.state.displayValue).toEqual('8');
	});

	it('should concatenates displayValue', () => {
		wrapperInstance.updateDisplay('2');
		wrapperInstance.updateDisplay('7');
		expect(wrapperInstance.state.displayValue).toEqual('27');
	});

	it('should removes leading "0" from displayValue', () => {
		wrapperInstance.updateDisplay('0');
		wrapperInstance.updateDisplay('8');
		expect(wrapperInstance.state.displayValue).toEqual('8');
	});

	it('should prevents multiple leading "0"s from displayValue', () => {
		wrapperInstance.updateDisplay('0');
		wrapperInstance.updateDisplay('0');
		expect(wrapperInstance.state.displayValue).toEqual('0');
	});

	it('should prevent continuous multiple "." from displayValue', () => {
		wrapperInstance.updateDisplay('.');
		wrapperInstance.updateDisplay('.');
		expect(wrapperInstance.state.displayValue).toEqual('.');
	});

	it('should prevent multiple "." from displayValue', () => {
		wrapperInstance.updateDisplay('1');
		wrapperInstance.updateDisplay('.');
		wrapperInstance.updateDisplay('2');
		wrapperInstance.updateDisplay('.');
		expect(wrapperInstance.state.displayValue).toEqual('1.2');
	});

	it('should remove last number from displayValue', () => {
		wrapperInstance.updateDisplay('1');
		wrapperInstance.updateDisplay('9');
		wrapperInstance.updateDisplay('ce');
		expect(wrapperInstance.state.displayValue).toEqual('1');
	});

	it('should display 0 when there is only 1 number left in displayValue', () => {
		wrapperInstance.updateDisplay('ce');
		expect(wrapperInstance.state.displayValue).toEqual('0');
	});
});