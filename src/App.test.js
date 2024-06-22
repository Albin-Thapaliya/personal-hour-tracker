import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { AuthContext } from './context/AuthContext';
import { fetchStats, fetchItems } from './services/apiService';

jest.mock('./services/apiService');

const mockUser = { isAdmin: true };
const mockStats = {
    availableTickets: 10,
    hoursWorked: 5,
    spentTickets: 2,
    pendingTickets: 1,
};
const mockItems = [
    { id: 1, name: 'Item 1', ticketCost: 5 },
    { id: 2, name: 'Item 2', ticketCost: 3 },
];

beforeEach(() => {
    fetchStats.mockResolvedValue(mockStats);
    fetchItems.mockResolvedValue(mockItems);
});

test('renders hour tracker and shop', async () => {
    render(
        <AuthContext.Provider value={{ user: mockUser }}>
            <App />
        </AuthContext.Provider>
    );

    expect(screen.getByText(/hour tracker and shop/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.getByText(/available tickets: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/hours worked: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/spent tickets: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/pending tickets: 1/i)).toBeInTheDocument();

    mockItems.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(`${item.ticketCost} tickets`, 'i'))).toBeInTheDocument();
    });
});

test('handles purchase', async () => {
    render(
        <AuthContext.Provider value={{ user: mockUser }}>
            <App />
        </AuthContext.Provider>
    );

    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    fireEvent.click(screen.getByText(/item 1/i).nextSibling);

    expect(screen.getByText(/purchase successful/i)).toBeInTheDocument();
    expect(screen.getByText(/available tickets: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/spent tickets: 7/i)).toBeInTheDocument();
});

test('shows error on fetch failure', async () => {
    fetchStats.mockRejectedValueOnce(new Error('Failed to fetch'));
    fetchItems.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
        <AuthContext.Provider value={{ user: mockUser }}>
            <App />
        </AuthContext.Provider>
    );

    await waitFor(() => expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument());
});

test('renders login for unauthenticated user', () => {
    render(
        <AuthContext.Provider value={{ user: null }}>
            <App />
        </AuthContext.Provider>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
});
