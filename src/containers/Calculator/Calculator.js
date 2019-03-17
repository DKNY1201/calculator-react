import React, { Component } from 'react';

import './Calculator.css';
import Display from '../../components/Display/Display';
import Keypad from '../../components/Keypad/Keypad';

class Calculator extends Component {
	constructor() {
		super();
		this.updateDisplay.bind(this);
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

	setOperator = () => {
		console.log('set operation');
	}

	updateDisplay = (val) => {
		let {displayValue} = this.state;

		if (val === 'ce') {
			if (displayValue.length <= 1) {
				displayValue = '0';
			} else {
				displayValue = displayValue.slice(0, displayValue.length - 1);
			}
		} else if(val === '.') {
			if (displayValue === '0') {
				displayValue = '.';
			} else {
				displayValue += displayValue.includes('.') ? '' : val;
			}
		} else {
			if (displayValue === '0') {
				displayValue = val;
			} else {
				displayValue += val;
			}
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