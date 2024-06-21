import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStats, fetchItems } from './apiService';
import UserStats from './UserStats';
import ShopMenu from './ShopMenu';
import Countdown from './Countdown';
import Transactions from './Transactions';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

function App() {
    const dispatch = useDispatch();
    const { tickets, hours, ticketsSpent, ticketsPending } = useSelector(state => state.user);
    const { items, transactions } = useSelector(state => state.shop);
    const [loading, setLoading] = useState(true);

    const countDownDate = new Date("Aug 31, 2024 16:00:00").getTime();

    useEffect(() => {
        const getData = async () => {
            try {
                const stats = await fetchStats();
                dispatch({ type: 'SET_USER', payload: stats });

                const items = await fetchItems();
                dispatch({ type: 'SET_ITEMS', payload: items });

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        getData();
    }, [dispatch]);

    const handlePurchase = (item) => {
        if (tickets >= item.ticketCost) {
            dispatch({ type: 'UPDATE_TICKETS', payload: -item.ticketCost });
            dispatch({ type: 'ADD_TRANSACTION', payload: { type: 'Spent', amount: item.ticketCost, item: item.name } });
        } else {
            alert('Not enough tickets');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorBoundary>
            <div className="App">
                <h1>Hour Tracker and Shop</h1>
                <Countdown targetDate={countDownDate} />
                <UserStats tickets={tickets} hours={hours} ticketsSpent={ticketsSpent} ticketsPending={ticketsPending} />
                <ShopMenu items={items} onPurchase={handlePurchase} />
                <Transactions transactions={transactions} />
            </div>
        </ErrorBoundary>
