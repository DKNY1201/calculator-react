import React, { Component } from 'react';

import './Calculator.css';
import Display from '../../components/Display/Display';
import Keypad from '../../components/Keypad/Keypad';

class Calculator extends Component {
	constructor() {
		super();
		// this.updateDisplay.bind(this);
	}
	state = {
		displayValue: '0',
		numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],
		operators: ['/', 'x', '-', '+'],
		selectedOperator: '',
		storedValue: ''
	};

	callOperator = () => {
		console.log('call operation');
	}

	setOperator = operator => {
		let {selectedOperator, storedValue, displayValue} = this.state;

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