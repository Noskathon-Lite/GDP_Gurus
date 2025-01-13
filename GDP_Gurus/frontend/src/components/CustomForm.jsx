import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';

const MyForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState({
    predictedGDP: 'N/A',
    year: 'N/A',
    errorMargin: 'N/A',
    confidenceLevel: 'N/A',
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
      // Replace the URL with your backend endpoint
      const response = await axios.post('https://your-backend-api.com/predict', { year: inputValue });
      if (response.data) {
        setResponseData(response.data);  // Update with actual data from API
      } else {
        setResponseData({
          predictedGDP: 'No data available',
          year: inputValue,
          errorMargin: 'Unknown',
          confidenceLevel: 'Unknown',
        });
      }
    } catch (err) {
      setError('Failed to fetch data from backend');
      setResponseData({
        predictedGDP: 'Error',
        year: inputValue,
        errorMargin: 'Error',
        confidenceLevel: 'Error',
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

      {!responseData ? (
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
        // Render a new form with parameters from the backend response or default values
        <form className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm border-white">
          <h5 className="text-xl text-white mb-4">Received Data</h5>

          {Object.entries(responseData).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1')} {/* Capitalize the keys */}
              </label>
              <Input
                type="text"
                id={key}
                value={value}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
          ))}

          <Button
            type="button"
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => setResponseData(null)} // Reset form when "Go Back" is clicked
          >
            Go Back
          </Button>
        </form>
      )}
    </>
  );
};

export default MyForm;
