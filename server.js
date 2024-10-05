const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);
    res.send('Form submitted successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Initialize budget variable
let budget = 1000; // Example initial budget

// Handle form submission with expenses
app.post('/submit-expense', (req, res) => {
    const expense = parseFloat(req.body.expense);
    const expenseInt = parseInt(req.body.expense, 10);
    if (!isNaN(expenseInt) && expenseInt > 0) {
        budget -= expenseInt;
        console.log(`Expense: ${expenseInt}, Remaining Budget: ${budget}`);
        res.send(`Expense recorded. Remaining budget: ${budget}`);
    } else {
        res.status(400).send('Invalid expense amount');
    }

    console.log('Budget:', budget);
});

