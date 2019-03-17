import React, { Component } from 'react';

import './Calculator.css';
import Display from '../../components/Display/Display';
import Keypad from '../../components/Keypad/Keypad';

class Calculator extends Component {
	constructor() {
		super();
	}
	state = {
		displayValue: '0',
		numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],
		operators: ['/', '*', '-', '+'],
		selectedOperator: '',
		storedValue: ''
	};

	callOperator = () => {
		let {displayValue, selectedOperator, storedValue} = this.state;

		switch(selectedOperator) {
			case '+':
				displayValue = +storedValue + +displayValue + '';
				break;
			case '-':
				displayValue = +storedValue - +displayValue + '';
				break;
			case '*':
				displayValue = +storedValue * +displayValue + '';
				break;
			case '/':
				displayValue = +storedValue / +displayValue;
				displayValue = (Math.round(displayValue * 100) / 100) + '';
				if (displayValue === 'NaN' || displayValue === 'Infinity') {
					displayValue = '0';
				}
				break;
			default:
				displayValue = '0';
		}

		selectedOperator = '';
		storedValue = '';

		this.setState({displayValue, selectedOperator, storedValue});
	}

	setOperator = operator => {
		let {displayValue, selectedOperator, storedValue} = this.state;

		if (selectedOperator === '') {
			storedValue = displayValue;
			displayValue = '0';
		}
		selectedOperator = operator;

		this.setState({selectedOperator, storedValue, displayValue});
	}

	updateDisplay = val => {
		let {displayValue} = this.state;

		if (val === '.' && displayValue.includes('.')) {
			val = '';
		}

		if (val === 'ce') {
			displayValue = displayValue.slice(0, displayValue.length - 1);

			if (displayValue === '') {
				displayValue = '0';
			}
		} else {
			displayValue = displayValue === '0' ? val : displayValue + val;
		}

		this.setState({displayValue});
	}

	render = () => {
		const {displayValue, numbers, operators} = this.state;

		return (
			<div className="calculator-container">
				<Display displayValue={displayValue}/>
				<Keypad
					callOperator={this.callOperator}
				  setOperator={this.setOperator}
				  updateDisplay={this.updateDisplay}
				  numbers={numbers}
				  operators={operators}
				/>
			</div>
		);
	}
}

export default Calculator;