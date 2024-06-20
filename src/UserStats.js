import React from 'react';

function UserStats({ tickets, hours, ticketsSpent, ticketsPending }) {
    return (
        <div>
            <h3>My Stats</h3>
            <p>Tickets Available to Spend: {tickets}</p>
            <p>Total Hours Worked: {hours} hours</p>
            <p>Tickets Pending Approval: {ticketsPending}</p>
            <p>Tickets Spent: {ticketsSpent}</p>
        </div>
    );
}

export default UserStats;
