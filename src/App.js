import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserStats from './UserStats';
import ShopMenu from './ShopMenu';
import Countdown from './Countdown';
function App() {
    const [tickets, setTickets] = useState(0);
    const [hours, setHours] = useState(0);
    const [ticketsSpent, setTicketsSpent] = useState(0);
    const [ticketsPending, setTicketsPending] = useState(0);
    const [shopItems, setShopItems] = useState([]);

    const countDownDate = new Date("Aug 31, 2024 16:00:00").getTime();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('_URL_');
                console.log(response.data);
                const { availableTickets, hoursWorked, spentTickets, pendingTickets } = response.data;
                setTickets(availableTickets);
                setHours(hoursWorked);
                setTicketsSpent(spentTickets);
                setTicketsPending(pendingTickets);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        const fetchItems = async () => {
            try {
                const response = await axios.get('_URL_');
                setShopItems(response.data.items);
            } catch (error) {
                console.error('Failed to fetch items', error);
            }
        };

        fetchStats();
        fetchItems();
    }, []);

    const handlePurchase = (item) => {
        if (tickets >= item.ticketCost) {
            setTickets(tickets - item.ticketCost);
            setTicketsSpent(ticketsSpent + item.ticketCost);
        } else {
            alert('Not enough tickets');
        }
    };

    const increaseTickets = () => {
        setTickets(tickets + 1);
    };

    const decreaseTickets = () => {
        setTickets(tickets - 1);
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
        </div>
    );
}

export default App;