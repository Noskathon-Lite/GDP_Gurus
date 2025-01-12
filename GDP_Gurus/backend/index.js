const express = require('express');
const app = express();

app.use(express.json());

app.post('/calculate', (req, res) => {
    try {
        const {
            country,
            year,
            gdpPerCapita,//optional
            populationTotal,
            gdp,//optional
        } = req.body;

    });