import React from 'react';

function Transactions({ transactions }) {
    return (
        <div>
            <h3>Transaction History</h3>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.type} {transaction.amount} Tickets for {transaction.item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Transactions;
