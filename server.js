const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// 1. Middleware (Allows the frontend to talk to the backend)
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serves your HTML/CSS files

// 2. Database Connection Configuration
const pool = new Pool({
    user: 'postgres',        // Default postgres user
    host: 'localhost',
    database: 'poonam_paints',
    password: 'root',        // ⚠️ REPLACE WITH YOUR PGADMIN PASSWORD
    port: 5432,
});

// 3. API Routes

// API: Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // WARNING: In a real app, compare hashed passwords, not plain text!
        const result = await pool.query(
            'SELECT user_id, company_name FROM Users WHERE email = $1 AND password_hash = $2', 
            [email, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// API: Get Orders for a specific User
app.get('/api/orders/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            'SELECT order_id, order_date, status, total_amount FROM Orders WHERE user_id = $1 ORDER BY order_date DESC', 
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
