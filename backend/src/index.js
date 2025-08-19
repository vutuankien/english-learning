const express = require('express');
const cors = require('cors'); // Add CORS package
const app = express();
require('dotenv').config();
const route = require('./routers/index'); // Adjust path as needed

// Enable CORS for your frontend origin
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies or auth headers if needed
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
route(app);



// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});