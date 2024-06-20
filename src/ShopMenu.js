import React from 'react';

function ShopMenu({ items, onPurchase }) {
    return (
        <div>
            <h3>Shop Menu</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - Cost: {item.ticketCost} Tickets
                        <button onClick={() => onPurchase(item)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShopMenu;