const express = require('express');
const app = express();
const port = 3000; // You can change this if needed

// Your API key, securely stored on the server
const API_KEY = 'Pkcka4f2BbdHh2FhzJtx';

// Allow CORS so your frontend can call this server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Proxy endpoint for DNC lookup
app.get('/check-dnc', async (req, res) => {
    const phone = req.query.phone;
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({ error: 'Please provide a valid 10-digit US phone number' });
    }

    try {
        const response = await fetch(`https://api.blacklistalliance.net/lookup?key=${API_KEY}&ver=v3&resp=json&phone=${phone}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});