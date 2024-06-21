import React from 'react';

function UserStats({ tickets, hours, ticketsSpent, ticketsPending, hoursPerDay }) {
    return (
        <div>
            <h3>My Stats</h3>
            <p>Tickets Available to Spend: {tickets}</p>
            <p>Total Hours Worked: {hours} hours</p>
            <p>Tickets Pending Approval: {ticketsPending}</p>
            <p>Tickets Spent: {ticketsSpent}</p>
            <p>Hours Needed per Day: {hoursPerDay.toFixed(2)} hours</p>
        </div>
    );
}

export default UserStats;
