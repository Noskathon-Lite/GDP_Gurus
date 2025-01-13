const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to handle GDP forecast requests
app.post('/forecast', (req, res) => {
    const { year, currentGDP } = req.body; // Get year and GDP from the request body

    if (!year || !currentGDP) {
        return res.status(400).json({
            success: false,
            message: 'Year and current GDP are required for forecasting.',
        });
    }

    const pythonProcess = spawn('python', [
        path.join(__dirname, '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/src/gdp_forecast.py'), 
        year,
        currentGDP
    ]);

    pythonProcess.stdout.on('data', (data) => {
        const result = data.toString();
        const [forecastedGDP, plotPath] = result.split('\n');

        res.status(200).json({
            success: true,
            message: `Forecasted GDP for ${year}`,
            forecastedGDP: JSON.parse(forecastedGDP),
            graphPath: plotPath.trim()
        });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            res.status(500).json({
                success: false,
                message: 'Failed to generate forecast',
            });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});