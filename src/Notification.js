import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

function Notification({ message, type, setNotification }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            // Cleanup timer
            return () => clearTimeout(timer);
        }
    }, [message, setNotification]);

    if (!message) return null;

    return (
        <div className={`notification notification-${type}`}>
            {message}
        </div>
    );
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
    setNotification: PropTypes.func.isRequired
};

export default Notification;
