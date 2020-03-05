const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log('app is listening on 5050'));