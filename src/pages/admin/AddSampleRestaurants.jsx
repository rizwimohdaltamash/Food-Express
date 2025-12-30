import React, { useState } from "react";
import { addSampleRestaurants } from "../../utils/addSampleRestaurants";
import Layout from "../../components/layout/Layout";
import { Store, CheckCircle } from "lucide-react";

const AddSampleRestaurants = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddRestaurants = async () => {
    setLoading(true);
    setMessage("Adding sample restaurants...");

    const success = await addSampleRestaurants();

    if (success) {
      setMessage("Sample restaurants added successfully! Visit the Restaurants page to view them.");
    } else {
      setMessage("Error adding sample restaurants. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="w-10 h-10 text-orange-600" />
            <h1 className="text-3xl font-bold text-orange-600">Add Sample Restaurants</h1>
          </div>

          <p className="text-gray-600 mb-6 text-center">
            Click the button below to populate your database with 6 amazing sample restaurants.
          </p>

          <button
            onClick={handleAddRestaurants}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 hover:shadow-xl"
            }`}
          >
            {loading ? "Adding..." : "Add Sample Restaurants"}
          </button>

          {message && (
            <div
              className={`mt-4 p-4 rounded-lg text-center font-semibold flex items-center gap-2 justify-center ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : message.includes("Error")
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {message.includes("successfully") && <CheckCircle className="w-5 h-5" />}
              <span>{message}</span>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500 text-center">
            <p>This will add 6 sample restaurants:</p>
            <ul className="mt-2 space-y-1 text-left">
              <li>• The Golden Fork (Italian)</li>
              <li>• Spice Route (Indian)</li>
              <li>• Sakura Sushi Bar (Japanese)</li>
              <li>• The Burger Joint (American)</li>
              <li>• Dragon Wok (Chinese)</li>
              <li>• Green Leaf Cafe (Vegan)</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddSampleRestaurants;
