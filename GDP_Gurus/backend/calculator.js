const express = require('express');
const app = express();

app.use(express.json());

app.post('/calculate', (req, res) => {
    try {
        const {
            year,
            gdpPerCapita, //opt
            populationTotal, 
            gdp, //opt
        } = req.body;

        if (!year || (!gdpPerCapita && !gdp)) {
            return res.status(400).json({
                success: false,
                message: 'Year and either GDP or GDP per capita with population are required.',
            });
        }

        let calculatedGDP = gdp;
        let calculatedPerCapitaIncome = gdpPerCapita;

        if (!gdp && gdpPerCapita && populationTotal) {
            calculatedGDP = gdpPerCapita * populationTotal;
        }

        if (!gdpPerCapita && gdp && populationTotal) {
            calculatedPerCapitaIncome = gdp / populationTotal;
        }

        if (!calculatedGDP || !calculatedPerCapitaIncome) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient data to calculate GDP or GDP per capita. Provide required values.',
            });
        }

        const country = 'Nepal';

        res.status(200).json({
            success: true,
            message: 'Calculation successful',
            data: {
                country,
                year,
                gdp: calculatedGDP,
                gdpPerCapita: calculatedPerCapitaIncome,
                populationTotal,
            },
        });
    } catch (error) {
        console.error('Error processing calculation:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});