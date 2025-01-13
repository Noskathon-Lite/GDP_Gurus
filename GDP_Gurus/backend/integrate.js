const express = require('express');
const cors = require('cors');
const path = require('path');
const { PythonShell } = require('python-shell');
const { error } = require('console');

const app = express();

// Enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/forecast_image', express.static(path.join(__dirname, '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/backend/forecast_image')));

app.post('/forecasttt', (req, res) => {
    const { year } = req.body;

    if (!year) {
        return res.status(400).json({ success: false, message: "Year is required." });
    }

    const options = {
        mode: 'text',
        pythonOptions: ['-u'],  // unbuffered output
        args: [year],
    };
    console.log("Forecasting started");

    // Create a new PythonShell instance
    PythonShell.run(path.join(__dirname, './model/src/gdp_forecast.py'), options).then((message)=>{
    console.log("message", message);
    resolve(message);
   
    // options, (err, result) => {
    //     if (err) {
    //         console.error("Error running Python script:", err);
    //         return res.status(500).json({ success: false, message: "Error running Python script." });
    //     }

    //     // Log the result to see what's coming back
    //     console.log("Python script output:", result);

    //     // Process the result
    //     if (!result || result.length < 2) {
    //         console.error("Invalid response from Python script:", result);
    //         return res.status(500).json({ success: false, message: "Invalid response from Python script." });
    //     }

    //     const formattedGDP = result[0].trim();  // First line: Formatted GDP
    //     const plotPath = result[1].trim();      // Second line: Plot path

    //     console.log(`Formatted GDP: ${formattedGDP}, Plot Path: ${plotPath}`);

    //     res.status(200).json({
    //         success: true,
    //         message: `Forecasted GDP for ${year}`,
    //         forecastedGDP: formattedGDP,
    //         graphPath: path.basename(plotPath),  // Send only the filename
    //     });
    });
});
app.post('/forecast', (async (req, res) => {
    try {
        const  year  = 2025;
      const Data = await getForecast(year);
      console.log("news:", Data);
      res.status(200).json({
                success: true,
                message: `Forecasted GDP for ${year}`,
                forecastedGDP: Data,
                // graphPath: path.basename(plotPath),  // Send only the filename÷
            });
    } catch (error) {
      console.error("Error in fetching news data:", error);
    }
}));
  
  const getForecast = async (year) => {
    return new Promise((resolve, reject) => {
        const options = {
            mode: 'text',
            pythonOptions: ['-u'],  // unbuffered output
            args: [year],
        };
  
        PythonShell.run(path.join(__dirname, './model/src/gdp_forecast.py'), options).then((message)=>{
          try {
            // Combine multi-line output, if necessary
            // const rawOutput = messages.join("");
            // console.log("Raw Output from Python:", rawOutput);
  
            // Replace single quotes with double quotes, if necessary
            // const formattedOutput = rawOutput.replace(/'/g, '"');
            // console.log("Formatted Output:", formattedOutput);
  
            // Parse the JSON
            // const parsedOutput = JSON.parse(formattedOutput);
            resolve(message);
          } catch (parseError) {
            console.error("Error parsing Python output:", parseError);
            reject("Failed to parse data from Python script");
          }
        })
        .catch((error) => {
          console.error("Error in Python script:", error);
          reject("Failed to retrieve data from Python script");
        });
    });
  };

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));