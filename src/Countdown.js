import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Countdown({ targetDate, timeZone, format }) {
    const [timeLeft, setTimeLeft] = useState('');

    const calculateTimeLeft = () => {
        const now = new Date().toLocaleString('en-US', { timeZone });
        const distance = new Date(targetDate).getTime() - new Date(now).getTime();

        if (distance < 0) {
            return "EXPIRED";
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (format === 'long') {
            return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
        } else if (format === 'short') {
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (format === 'minimal') {
            return `${days}:${hours}:${minutes}:${seconds}`;
        }

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        const updateCountdown = () => {
            setTimeLeft(calculateTimeLeft());
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId);
    }, [targetDate, timeZone, format]);

    return (
        <div id="countdown" aria-live="polite">
            {timeLeft}
        </div>
    );
}

Countdown.propTypes = {
    targetDate: PropTypes.string.isRequired,
    timeZone: PropTypes.string,
    format: PropTypes.oneOf(['long', 'short', 'minimal']),
};

Countdown.defaultProps = {
    timeZone: 'UTC',
    format: 'short',
};

export default Countdown;
