import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Pizza, IceCream, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[45vh] md:h-[55vh] lg:h-[65vh] bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex flex-col justify-center items-center text-white relative overflow-hidden">
      
      {/* Floating Food Icons */}
      <motion.div
        className="absolute top-20 left-10 text-yellow-200"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Pizza size={60} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-16 text-yellow-200"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <IceCream size={50} />
      </motion.div>

      {/* Logo + Brand */}
      <motion.div
        className="flex items-center gap-3 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <UtensilsCrossed className="text-white text-5xl md:text-6xl drop-shadow-lg" size={60} />
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl tracking-tight">
          FoodExpress
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-3 text-sm md:text-lg lg:text-xl text-center text-yellow-50 w-[85%] md:w-[60%] lg:w-[45%] font-medium drop-shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Craving something delicious? Get your favorite meals delivered hot and fresh to your door in minutes!
      </motion.p>

      {/* CTA Buttons */}
      <div className="flex gap-4 mt-6">
        <motion.button
          className="px-6 py-3 bg-white text-orange-600 font-bold rounded-full shadow-xl hover:bg-yellow-50 hover:scale-105 transition-transform flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/allproduct")}
        >
          <UtensilsCrossed className="w-5 h-5" />
          Order Now
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-yellow-400 text-orange-900 font-bold rounded-full shadow-xl hover:bg-yellow-300 hover:scale-105 transition-transform flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/allproduct")}
        >
          <Menu className="w-5 h-5" />
          View Menu
        </motion.button>
      </div>

      {/* Decorative Glow Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-orange-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
    </div>
  );
};

export default HeroSection;
