import React, { useState } from "react";
import { addSampleFoodData } from "../../utils/addSampleFoodData";
import Layout from "../../components/layout/Layout";
import { Pizza, UtensilsCrossed, CheckCircle, XCircle } from "lucide-react";

const AddSampleDataPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddSampleData = async () => {
    setLoading(true);
    setMessage("Adding sample food items...");
    
    const success = await addSampleFoodData();
    
    if (success) {
      setMessage("Sample food items added successfully! You can now view them on the homepage.");
    } else {
      setMessage("Error adding sample data. Check console for details.");
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center flex items-center justify-center gap-2">
            <Pizza className="w-8 h-8" /> Add Sample Food Data
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Click the button below to populate your database with delicious sample food items.
          </p>
          
          <button
            onClick={handleAddSampleData}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 hover:shadow-xl"
            }`}
          >
            {loading ? "Adding..." : (
              <>
                Add Sample Food Items <UtensilsCrossed className="w-5 h-5" />
              </>
            )}
          </button>
          
          {message && (
            <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
              message.includes("successfully") 
                ? "bg-green-100 text-green-700" 
                : message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}>
              <div className="flex items-center justify-center gap-2">
                {message.includes("successfully") && <CheckCircle className="w-5 h-5" />}
                {message.includes("Error") && <XCircle className="w-5 h-5" />}
                {message}
              </div>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-500 text-center">
            <p>This will add 12 sample food items including:</p>
            <p className="mt-2">Pizzas • Burgers • Biryani</p>
            <p>Salads • Desserts • Drinks</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddSampleDataPage;
