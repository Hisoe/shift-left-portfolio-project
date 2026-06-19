const express = require('express');
const app = express();

// Intentional Vulnerability 1: Hardcoded "Secret"
const GITHUB_TOKEN = "ghp_1234567890abcdefGHIJKLmnopqrstuvwxyz";

app.get('/', (req, res) => {
    // Intentional Vulnerability 2: Dangerous input execution
    const userInput = req.query.input;
    if (userInput) {
        eval(userInput);
    }
    res.send('Welcome to the vulnerable app!');
});

app.listen(3000, () => console.log('Server running on port 3000'));