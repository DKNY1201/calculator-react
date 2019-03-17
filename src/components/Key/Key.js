import React from 'react';
import PropTypes from 'prop-types';

const key = ({keyAction, keyType, keyValue}) => (
	<div className="key-container" />
);

key.propTypes = {
	keyAction: PropTypes.func.isRequired,
	keyType: PropTypes.string.isRequired,
	keyValue: PropTypes.string.isRequired
};

export default key;