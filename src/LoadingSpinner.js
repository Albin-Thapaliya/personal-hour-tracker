import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

function LoadingSpinner({ size, color, message }) {
    return (
        <div className="spinner-container">
            <div
                className={`spinner spinner-${size}`}
                style={{ borderColor: `${color} transparent transparent transparent` }}
                aria-label="Loading"
            />
            {message && <div className="spinner-message">{message}</div>}
        </div>
    );
}

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.string,
    message: PropTypes.string,
};

LoadingSpinner.defaultProps = {
    size: 'medium',
    color: '#61dafb',
    message: 'Loading...',
};

export default LoadingSpinner;
