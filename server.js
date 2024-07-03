const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint do pobierania danych
app.get('/data.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data.json'));
});

// Endpoint do zapisywania danych
app.put('/data.json', (req, res) => {
    fs.writeFile(path.join(__dirname, 'public', 'data.json'), JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error('Nie udało się zapisać danych:', err);
            res.status(500).send('Wystąpił błąd podczas zapisywania danych.');
        } else {
            res.status(200).send('Dane zapisane pomyślnie.');
        }
    });
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
