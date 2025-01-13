import React, { useState } from 'react';
import { Input } from './ui/input';  // Custom Input component path
import { Button } from './ui/button';  // Custom Button component path
import axios from 'axios';

const MyForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState({
    forecastedGDP: 'N/A',
    year: 'N/A',
    graphPath: 'N/A',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/forecast', {
        year: inputValue,
      });

      if (response.data.success) {
        setResponseData({
          forecastedGDP: response.data.forecastedGDP,
          year: inputValue,
          graphPath: response.data.graphPath,
        });
      } else {
        setResponseData({
          forecastedGDP: 'No data available',
          year: inputValue,
          graphPath: 'N/A',
        });
      }
    } catch (err) {
      setError('Failed to fetch data from backend');
      setResponseData({
        forecastedGDP: 'Error',
        year: inputValue,
        graphPath: 'Error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="text-3xl font-semibold tracking-tight text-center text-green-700 mb-6 mt-12 px-4 py-2">
        Predict the future GDP
      </h4>

      {!responseData.forecastedGDP ? (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full h-60 max-w-sm border-white"
        >
          <div>
            <Input
              type="text"
              id="input"
              value={inputValue}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-lg placeholder:text-gray-400"
              placeholder="Enter the year"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </Button>

          {loading && <p className="text-center text-white mt-4">Loading...</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </form>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm border-white">
          <h5 className="text-xl text-white mb-4">Received Data</h5>

          <div>
            <label className="block text-sm font-medium text-gray-300">Forecasted GDP</label>
            <p className="text-white">{responseData.forecastedGDP}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Graph</label>
            <img src={`http://localhost:3000/forecast_image/${responseData.graphPath}`} alt="Forecast Graph" />
          </div>

          <Button
            type="button"
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => {
              setResponseData({});
              setInputValue('');  // Clear the input field as well
            }}
          >
            Go Back
          </Button>
        </div>
      )}
    </>
  );
};

export default MyForm;