import React, { useState, useEffect } from 'react';
import { fetchItems, addItem, deleteItem } from './apiService';

function AdminPanel() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState(0);

    useEffect(() => {
        const loadItems = async () => {
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
        };

        loadItems();
    }, []);

    const handleAddItem = async () => {
        try {
            const newItem = await addItem({ name: itemName, ticketCost: itemCost });
            setItems([...items, newItem]);
            setItemName('');
            setItemCost(0);
        } catch (error) {
            console.error('Failed to add item', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await deleteItem(itemId);
            setItems(items.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Failed to delete item', error);
        }
    };

    return (
        <div>
            <h3>Admin Panel</h3>
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
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.ticketCost} Tickets
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
