import React from 'react';
import {shallow} from 'enzyme';

import Display from './Display';

describe('<Display />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Display displayValue={''}/>);
	});

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a div', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});

	it('should render value of displayValue', () => {
		wrapper.setProps({displayValue: '2702'});
		expect(wrapper.text()).toEqual('2702');
	})
});