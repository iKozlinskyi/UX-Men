const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(__dirname + "/dist"));

const port = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/landing.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/about.html'));
});

app.get('/heroes', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/heroes.html'));
});

app.get('/maven', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/maven.ejs'));
})

app.listen(port, () => console.log('app is listening on 5050'));
