const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let budget = 0; // Initialize the budget variable
let expenses = []; // Store the expenses

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Handle setting the budget
app.post('/set-budget', (req, res) => {
    budget = parseFloat(req.body.budget);
    expenses = []; // Clear expenses when budget is reset
    res.json({ message: 'Budget set successfully', budget }); // Send JSON response
});

// Handle submitting expenses
app.post('/submit-expense', (req, res) => {
    const expense = {
        amount: parseFloat(req.body.expense),
        category: req.body.category,
        date: req.body.date || new Date().toISOString().split('T')[0], // Use current date if not provided
        description: req.body.description || ''
    };
    expenses.push(expense);
    budget -= expense.amount; // Subtract expense from budget
    res.json({ message: 'Expense added successfully', remainingBudget: budget, expenses }); // Respond with updated budget and expenses
});

// Provide the current budget
app.get('/get-budget', (req, res) => {
    res.json({ remainingBudget: budget });
});

// Provide the list of expenses
app.get('/get-expenses', (req, res) => {
    res.json({ expenses });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
