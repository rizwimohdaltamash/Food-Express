import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { Store, Star, Clock, MapPin, ChefHat } from "lucide-react";

const RestaurantList = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = async () => {
    setLoading(true);
    try {
      const q = collection(fireDB, "restaurants");
      const querySnapshot = await getDocs(q);
      const restaurantArray = [];
      querySnapshot.forEach((doc) => {
        restaurantArray.push({ ...doc.data(), id: doc.id });
      });
      setRestaurants(restaurantArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRestaurants();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
              <Store className="w-10 h-10 text-orange-600" />
              Partner Restaurants
            </h1>
            <p className="text-gray-600 text-lg">Discover amazing restaurants near you</p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 border-2 border-orange-100"
              >
                {/* Restaurant Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={restaurant.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Restaurant Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">{restaurant.name}</h2>
                    <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-white" />
                      <span className="font-bold text-sm">{restaurant.rating || "4.5"}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <ChefHat className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{restaurant.cuisine || "Multi-Cuisine"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{restaurant.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{restaurant.timing || "10:00 AM - 11:00 PM"}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                    Book Table
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && restaurants.length === 0 && (
            <div className="text-center py-16">
              <Store className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Restaurants Yet</h3>
              <p className="text-gray-600">Check back soon for amazing restaurants!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantList;
