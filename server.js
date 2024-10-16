const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Parse application/x-www-form-urlencoded and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let budget = 0; // Initialize the budget variable
let expenses = []; // Store the expenses

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the dashboard page on a GET request to the root ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html'));
});

app.get('/setbudget', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'setbudget', 'setbudget.html'));
});

app.get('/addExpense', (res) => {
    res.sendFile(path.join(__dirname, 'public' , 'addExpense' , 'addExpense.html' ));
});
// Handle setting the budget
app.post('/set-budget', (req, res) => {
    const budgetValue = parseFloat(req.body.budget);

    // Validate that budget value is provided and is a valid number
    if (isNaN(budgetValue)) {
        return res.status(400).json({ error: 'Invalid budget value' });
    }

    budget = budgetValue;
    expenses = []; // Clear expenses when budget is reset
    res.json({ message: 'Budget set successfully', budget });
});

// Handle submitting expenses
app.post('/submit-expense', (req, res) => {
    const expenseAmount = parseFloat(req.body.expense);

    // Validate the expense value and required fields
    if (isNaN(expenseAmount) || !req.body.category) {
        return res.status(400).json({ error: 'Invalid expense or category missing' });
    }

    const expense = {
        amount: expenseAmount,
        category: req.body.category,
        date: req.body.date || new Date().toISOString().split('T')[0], // Use current date if not provided
        description: req.body.description || ''
    };

    expenses.push(expense);
    budget -= expense.amount; // Subtract expense from budget

    res.json({ message: 'Expense added successfully', remainingBudget: budget, expenses });
});

// Route to provide the current budget
app.get('/get-budget', (req, res) => {
    res.json({ remainingBudget: budget });
});

// Route to provide the list of expenses
app.get('/get-expenses', (req, res) => {
    res.json({ expenses });
});


// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
