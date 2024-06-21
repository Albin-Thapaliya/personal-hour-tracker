import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserStats from './UserStats';
import ShopMenu from './ShopMenu';
import Countdown from './Countdown';
import Transactions from './Transactions';
import { fetchStats, fetchItems } from './apiService';

function App() {
    const [tickets, setTickets] = useState(0);
    const [hours, setHours] = useState(0);
    const [ticketsSpent, setTicketsSpent] = useState(0);
    const [ticketsPending, setTicketsPending] = useState(0);
    const [shopItems, setShopItems] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const countDownDate = new Date("Aug 31, 2024 16:00:00").getTime();

    useEffect(() => {
        const getData = async () => {
            try {
                const stats = await fetchStats();
                setTickets(stats.availableTickets);
                setHours(stats.hoursWorked);
                setTicketsSpent(stats.spentTickets);
                setTicketsPending(stats.pendingTickets);

                const items = await fetchItems();
                setShopItems(items);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        getData();
    }, []);

    const handlePurchase = (item) => {
        if (tickets >= item.ticketCost) {
            setTickets(tickets - item.ticketCost);
            setTicketsSpent(ticketsSpent + item.ticketCost);
            setTransactions([...transactions, { type: 'Spent', amount: item.ticketCost, item: item.name }]);
        } else {
            alert('Not enough tickets');
        }
    };

    const increaseTickets = () => {
        setTickets(tickets + 1);
    };

    const decreaseTickets = () => {
        if (tickets > 0) {
            setTickets(tickets - 1);
        }
    };

    return (
        <div className="App">
            <h1>Hour Tracker and Shop</h1>
            <Countdown targetDate={countDownDate} />
            <UserStats tickets={tickets} hours={hours} ticketsSpent={ticketsSpent} ticketsPending={ticketsPending} />
            <ShopMenu items={shopItems} onPurchase={handlePurchase} />
            <div>
                <button onClick={increaseTickets}>Increase Tickets</button>
                <button onClick={decreaseTickets}>Decrease Tickets</button>
                <p>Tickets: {tickets}</p>
            </div>
            <Transactions transactions={transactions} />
        </div>
    );
}

export default App;
