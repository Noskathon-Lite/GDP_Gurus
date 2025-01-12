import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [gdpInput, setGdpInput] = useState("");

  const handlePredict = () => {
    console.log("Predicting GDP for:", gdpInput);
  };

  const data = [
    { name: '2018', gdp: 2.3 },
    { name: '2019', gdp: 2.5 },
    { name: '2020', gdp: -3.4 },
    { name: '2021', gdp: 5.7 },
    { name: '2022', gdp: 2.6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-gray-900 via-black to-gray-800 h-full text-white font-sans"
    >
      <div className="flex flex-col items-center justify-center h-full px-4 space-y-8">
        {/* Logo */}
        <motion.img
          className="w-24 mb-4"
          src="/logo.png"
          alt="App Logo"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Title */}
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          GDP Prediction Using AI
        </motion.h1>

        {/* Introduction */}
        <motion.p
          className="text-lg text-center text-gray-300 max-w-prose"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Gross Domestic Product (GDP) is the total monetary value of all goods
          and services produced within a country's borders in a specific time
          period. It's a key indicator used to gauge the health and size of a
          nation's economy.
        </motion.p>
    
  
        {/* Input Section */}
        <motion.div
          className="flex flex-col space-y-4 w-full max-w-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Input
            type="text"
            placeholder="Enter GDP-related data..."
            className="p-4 text-white"
            value={gdpInput}
            onChange={(e) => setGdpInput(e.target.value)}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              onClick={handlePredict}
            >
              Predict GDP
            </Button>
          </motion.div>
        </motion.div>

        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <ResponsiveContainer width="80%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="gdp" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
        {/* Footer */}
        <motion.footer
          className="text-sm text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Powered by AI | © {new Date().getFullYear()}
        </motion.footer>
      </div>
    </motion.div>
  );
}

export default App;
