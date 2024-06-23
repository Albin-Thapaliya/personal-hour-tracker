import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

function Notification({ message, type }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            // Cleanup timer
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div className={`notification notification-${type}`}>
            {message}
        </div>
    );
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired
};

export default Notification;
