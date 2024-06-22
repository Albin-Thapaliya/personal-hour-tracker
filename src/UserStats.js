import React from 'react';
import PropTypes from 'prop-types';
import './UserStats.css';

function UserStats({ tickets, hours, ticketsSpent, ticketsPending, targetHours }) {
    const hoursPerDay = (targetHours / 30).toFixed(2);
    return (
        <div className="user-stats">
            <h3>My Stats</h3>
            <div className="stat">
                <span className="stat-label">Tickets Available to Spend:</span>
                <span className="stat-value">{tickets}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Total Hours Worked:</span>
                <span className="stat-value">{hours} hours</span>
            </div>
            <div className="stat">
                <span className="stat-label">Tickets Pending Approval:</span>
                <span className="stat-value">{ticketsPending}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Tickets Spent:</span>
                <span className="stat-value">{ticketsSpent}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Hours Needed per Day:</span>
                <span className="stat-value">{hoursPerDay} hours</span>
            </div>
        </div>
    );
}

UserStats.propTypes = {
    tickets: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    ticketsSpent: PropTypes.number.isRequired,
    ticketsPending: PropTypes.number.isRequired,
    targetHours: PropTypes.number.isRequired,
};

export default UserStats;
