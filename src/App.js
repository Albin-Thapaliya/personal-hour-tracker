import React, { useEffect, useContext, useState } from 'react';
import { fetchStats, fetchItems } from './services/apiService';
import UserStats from './components/UserStats';
import ShopMenu from './components/ShopMenu';
import Countdown from './components/Countdown';
import Transactions from './components/Transactions';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import Notification from './components/Notification';
import { AuthContext, AuthProvider } from './context/AuthContext';

function App() {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState(0);
    const [hours, setHours] = useState(0);
    const [ticketsSpent, setTicketsSpent] = useState(0);
    const [ticketsPending, setTicketsPending] = useState(0);
    const [shopItems, setShopItems] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

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

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setNotification({ message: 'Failed to fetch data', type: 'error' });
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handlePurchase = (item) => {
        if (tickets >= item.ticketCost) {
            setTickets(tickets - item.ticketCost);
            setTicketsSpent(ticketsSpent + item.ticketCost);
            setTransactions([...transactions, { type: 'Spent', amount: item.ticketCost, item: item.name }]);
            setNotification({ message: 'Purchase successful', type: 'success' });
        } else {
            setNotification({ message: 'Not enough tickets', type: 'error' });
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorBoundary>
            <div className="App">
                <h1>Hour Tracker and Shop</h1>
                {notification.message && <Notification message={notification.message} type={notification.type} />}
                {user ? (
                    <>
                        <Countdown targetDate={countDownDate} />
                        <UserStats
                            tickets={tickets}
                            hours={hours}
                            ticketsSpent={ticketsSpent}
                            ticketsPending={ticketsPending}
                        />
                        <ShopMenu items={shopItems} onPurchase={handlePurchase} />
                        <Transactions transactions={transactions} />
                        {user.isAdmin && <AdminPanel />}
                    </>
                ) : (
                    <Auth />
                )}
            </div>
        </ErrorBoundary>
    );
}

export default App;
