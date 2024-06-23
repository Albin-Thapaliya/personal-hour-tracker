import React, { useState, useEffect, useContext } from 'react';
import { fetchItems, addItem, deleteItem } from 'apiService.js';
import { AuthContext } from 'AuthContext.js';

function AdminPanel() {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            try {
                const fetchedItems = await fetchItems();
                setItems(fetchedItems);
            } catch (error) {
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    const handleAddItem = async () => {
        setLoading(true);
        setError(null);
        setMessage('');
        try {
            const newItem = await addItem({ name: itemName, ticketCost: itemCost });
            setItems([...items, newItem]);
            setItemName('');
            setItemCost(0);
            setMessage('Item added successfully');
        } catch (error) {
            setError('Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (itemId) => {
        setLoading(true);
        setError(null);
        setMessage('');
        try {
            await deleteItem(itemId);
            setItems(items.filter(item => item.id !== itemId));
            setMessage('Item deleted successfully');
        } catch (error) {
            setError('Failed to delete item');
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.isAdmin) {
        return <div>Access denied</div>;
    }

    return (
        <div>
            <h3>Admin Panel</h3>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {message && <div style={{ color: 'green' }}>{message}</div>}
            <div>
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Item Name"
                />
                <input
                    type="number"
                    value={itemCost}
                    onChange={(e) => setItemCost(Number(e.target.value))}
                    placeholder="Item Cost"
                />
                <button onClick={handleAddItem} disabled={loading}>Add Item</button>
            </div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.ticketCost} Tickets
                        <button onClick={() => handleDeleteItem(item.id)} disabled={loading}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
