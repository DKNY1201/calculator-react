import React from 'react';
import PropTypes from 'prop-types';

import './Display.css';

const display = ({displayValue}) => (
	<div className="display-container">
		<p className="display-value">{displayValue}</p>
	</div>
);

display.propTypes = {
	displayValue: PropTypes.string.isRequired
}

export default display;