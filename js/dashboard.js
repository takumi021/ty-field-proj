document.addEventListener('DOMContentLoaded', async () => {
    // 1. Check if user is logged in
    const userStr = sessionStorage.getItem('user');
    
    // If not logged in, kick them back to the login page
    if (!userStr) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(userStr);
    
    // 2. Update the "Welcome" message with the company name
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.textContent = `Welcome, ${user.company_name}!`;
    }

    // 3. Fetch Live Orders from Database
    try {
        // We use the user.user_id to get ONLY this company's orders
        const response = await fetch(`http://localhost:3000/api/orders/${user.user_id}`);
        const orders = await response.json();

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Clear the dummy data we put in HTML

        // Loop through the orders and create table rows
        if (orders.length > 0) {
            orders.forEach(order => {
                const date = new Date(order.order_date).toLocaleDateString();
                const row = `
                    <tr>
                        <td>#PP-${order.order_id}</td>
                        <td>${date}</td>
                        <td>₹${order.total_amount}</td>
                        <td>${order.status}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="4">No orders found.</td></tr>';
        }
        
    } catch (error) {
        console.error('Error fetching orders:', error);
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '<tr><td colspan="4" style="color:red;">Error connecting to server.</td></tr>';
    }

    // 4. Make the Logout Button work
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear the session and go back to login
            sessionStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
});
