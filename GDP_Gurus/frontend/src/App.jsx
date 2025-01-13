import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Areachart from "./components/ui/AreaChart";
import Barchart from "./components/ui/Barchart";
import CustomCard from "./components/CustomCard";

function App() {
  const [gdpInput, setGdpInput] = useState("");

  const handlePredict = () => {
    console.log("Predicting GDP for:", gdpInput);
  };

  const parameters = [
    {
      name: "GDP Growth Rate",
      description:
        "The annual percentage growth of GDP, measuring how fast the economy is growing.",
    },
    {
      name: "Inflation Rate",
      description:
        "The rate at which the general level of prices for goods and services is rising, eroding purchasing power.",
    },
    {
      name: "Unemployment Rate",
      description:
        "The percentage of the workforce that is unemployed and actively seeking employment.",
    },
    {
      name: "Exports",
      description:
        "The total value of goods and services sold by a country to other nations.",
    },
    {
      name: "Imports",
      description:
        "The total value of goods and services purchased by a country from other nations.",
    },
  ];


  return (
    <motion.div
      initial={false} // Disable animation on initial render
      animate={{ opacity: 1 }} // Keep opacity fixed at 1
      className="bg-gradient-to-r from-gray-900 via-black to-gray-800 min-h-screen text-white font-sans"
    >
      <div className="flex flex-col items-center justify-center  px-6 py-10">
        {/* Logo */}
        <motion.img
          className="w-24 mb-4"
          src="/logo.png"
          alt="App Logo"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.p
          className="text-4xl font-extrabold tracking-tight mb-5 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          GDP-Guru
        </motion.p>

        {/* Title */}
        <motion.h1
          className="text-2xl font-semibold tracking-tight text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          GDP Prediction of Nepal Using AI
        </motion.h1>

        {/* Introduction */}
        <motion.p
          className="text-lg text-center text-gray-300 max-w-7xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Gross Domestic Product (GDP) is a comprehensive measure of a nation's overall economic activity.
          It represents the total monetary value of all goods and services produced within a country's borders
          over a specific period, typically calculated annually or quarterly. As a critical indicator of
          economic health, GDP helps policymakers, investors, and businesses evaluate the growth, stability,
          and productivity of an economy. Understanding GDP trends can provide valuable insights into a country's
          development trajectory, highlight potential areas for investment, and guide strategic decision-making
          at both local and global levels.
        </motion.p>

        <motion.h3
          className="text-3xl font-extrabold tracking-tight text-center text-blue-400 mb-6 mt-12 px-4 py-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Key Parameters for GDP Prediction
        </motion.h3>


        {/* Input Section */}
        {/* <motion.div
          className="flex flex-col items-center space-y-4 w-full max-w-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Input
            type="text"
            placeholder="Enter the year for data..."
            className="p-4 text-white bg-gray-700 border border-gray-600 focus:border-blue-500"
            value={gdpInput}
            onChange={(e) => setGdpInput(e.target.value)}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-lg rounded-md"
              onClick={handlePredict}
            >
              Predict GDP
            </Button>
          </motion.div>
        </motion.div> */}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-16">
          {parameters.map((param, index) => (
            <CustomCard
              key={index}
              name={param.name}
              description={param.description}
              index={index}
            />
          ))}
        </div>

      </div>

      <div className="flex flex-col items-center justify-center">

        <div className="w-full space-y-10">
          <h3
            className="text-3xl font-extrabold tracking-tight text-center text-gray-400 mb-6 mt-12 px-4 py-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
             last 7 years data
          </h3>

          <div className="bg-gray-800 rounded-lg p-6 w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
              Past Data
            </h2>
            <div className="grid grid-rows-1 md:grid-rows-2 gap-8">
              <div className="w-full h-64 md:h-80">
                <Areachart />
              </div>
              <h3
                className="text-3xl font-semibold tracking-tight text-center text-gray-400 mb-6 mt-12 px-4 py-2"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                Comparison of past parameter values
              </h3>
              <div className="w-full h-64 md:h-80 my-6">
                <Barchart />
              </div>
            </div>
          </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 w-full shadow-lg">
          <h3
            className="text-3xl font-semibold tracking-tight text-center text-gray-400 mb-6 mt-12 px-4 py-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            GDP values
          </h3>


        
        </div>

        <div className="bg-gray-800 rounded-lg p-6 w-full shadow-lg">
          <h4
            className="text-3xl font-semibold tracking-tight text-center text-green-700 mb-6 mt-12 px-4 py-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            Predict the future GDP?
          </h4>



        
        </div>
      </div>

    </motion.div>
  );
}

export default App;
