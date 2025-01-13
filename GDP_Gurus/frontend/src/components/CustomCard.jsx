// Card.js
import { motion } from "framer-motion";

function CustomCard({ name, description }) {
  return (
    <motion.div
      className="relative bg-gray-800 rounded-lg shadow-lg p-6 overflow-hidden cursor-pointer w-96 h-80 flex flex-col items-center justify-center group"
      whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Title that moves to top on hover */}
      <motion.h3
        className="text-3xl font-semibold text-blue-400 absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 group-hover:top-12"
      >
        {name}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-gray-300 text-lg opacity-0 absolute bottom-6 left-6 right-6 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-[-10px] group-hover:text-xl group-hover:top-24"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default CustomCard;
