const express = require('express');
const app = express();

// Intentional Vulnerability 1: Hardcoded "Secret"
const SLACK_BOT_TOKEN = "xoxb-123456789012-1234567890123-a1B2c3D4e5F6g7H8i9J0kLmn";

app.get('/', (req, res) => {
    // Intentional Vulnerability 2: Dangerous input execution
    const userInput = req.query.input;
    if (userInput) {
        eval(userInput);
    }
    res.send('Welcome to the vulnerable app!');
});

app.listen(3000, () => console.log('Server running on port 3000'));