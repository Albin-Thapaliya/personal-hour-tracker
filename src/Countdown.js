import React, { useState, useEffect } from 'react';

function Countdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft("EXPIRED");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        const intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId);
    }, [targetDate]);

    return (
        <div id="countdown">
            {timeLeft}
        </div>
    );
}

export default Countdown;
