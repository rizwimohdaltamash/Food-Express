import React, { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { Store, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const RestaurantManagement = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllRestaurants, setGetAllRestaurants } = context;
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const q = collection(fireDB, "restaurants");
      const querySnapshot = await getDocs(q);
      const restaurantArray = [];
      querySnapshot.forEach((doc) => {
        restaurantArray.push({ ...doc.data(), id: doc.id });
      });
      setGetAllRestaurants(restaurantArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteRestaurant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "restaurants", id));
      toast.success("Restaurant deleted");
      fetchRestaurants();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete restaurant");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
    <div className="py-5 flex justify-center items-center">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
          <div className="flex items-center justify-between p-5 bg-orange-500 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Store className="w-7 h-7" />
              Restaurant Management
            </h1>
            <button
              onClick={() => navigate("/add-restaurant")}
              className="px-4 py-2 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all"
            >
              + Add Restaurant
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-orange-100 border-b-2 border-orange-200">
                <tr>
                  <th scope="col" className="px-6 py-3">S.No</th>
                  <th scope="col" className="px-6 py-3">Restaurant Name</th>
                  <th scope="col" className="px-6 py-3">Cuisine</th>
                  <th scope="col" className="px-6 py-3">Address</th>
                  <th scope="col" className="px-6 py-3">Rating</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getAllRestaurants.map((item, index) => {
                  const { id, name, cuisine, address, rating, date } = item;
                  return (
                    <tr key={index} className="bg-white border-b hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{name}</td>
                      <td className="px-6 py-4">{cuisine}</td>
                      <td className="px-6 py-4">{address?.substring(0, 40)}...</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          {rating || "4.5"} ★
                        </span>
                      </td>
                      <td className="px-6 py-4">{date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/restaurant/${id}`)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => deleteRestaurant(id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!loading && getAllRestaurants.length === 0 && (
            <div className="text-center py-16 bg-white">
              <Store className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No restaurants added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default RestaurantManagement;
