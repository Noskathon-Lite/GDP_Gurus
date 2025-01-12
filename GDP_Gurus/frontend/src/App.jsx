import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Areachart from "./components/ui/AreaChart";
import Barchart from "./components/ui/Barchart";





function App() {
  const [gdpInput, setGdpInput] = useState("");

  const handlePredict = () => {
    console.log("Predicting GDP for:", gdpInput);
  };

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
          GDP Prediction of Nepal Using AI
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

        <Areachart/>
        <Barchart/>


        
      </div>

      <motion.div
        className="flex flex-col space-y-4 w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <Input
          type="text"
          placeholder="Enter the year for data..."
          className="p-4 text-white"
          value={gdpInput}
          onChange={(e) => setGdpInput(e.target.value)}
        />

      </motion.div>

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
  );
}

export default App;
