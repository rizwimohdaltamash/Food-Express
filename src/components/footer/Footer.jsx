import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {

  return (
    <footer className="text-gray-200 body-font bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 shadow-inner">
      {/* main container */}
      <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
        
        {/* Brand name */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white hover:text-yellow-300 transition"
        >
          FoodExpress
        </motion.span>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l sm:border-yellow-300 sm:py-2 sm:mt-0 mt-4"
        >
          © 2025 FoodExpress —
          <Link
            to="/"
            className="text-yellow-300 ml-1 hover:text-yellow-200 transition"
            rel="noopener noreferrer"
            target="_blank"
          >
            @foodexpress
          </Link>
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;

