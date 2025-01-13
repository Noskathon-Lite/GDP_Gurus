const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(bodyParser.json()); 

app.post('/api/forecast', (req, res) => {
  const { year, country } = req.body;

  if (!year || !country) {
    return res.status(400).json({ error: 'Year and country are required' });
  }

  const pythonProcess = spawn('python3', [
    path.join(__dirname, '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/src/gdp_forecast.py'),
    year.toString(),
    country,
  ]);

  let forecastData = '';
  pythonProcess.stdout.on('data', (data) => {
    forecastData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      const imagePath = `/Users/void/Desktop/GDP_ Guru/GDP_Gurus/backend/forecast_image/forecast_${year}.png`;
      res.json({
        forecast: forecastData.trim(),
        plotImage: imagePath,
      });
    } else {
      res.status(500).json({ error: 'Failed to generate forecast' });
    }
  });
});

app.use('/images', express.static(path.join(__dirname, 'model')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});