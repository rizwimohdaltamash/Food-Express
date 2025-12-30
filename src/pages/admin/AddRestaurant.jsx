import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { Store, Upload } from "lucide-react";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: "",
    address: "",
    phone: "",
    email: "",
    timing: "",
    rating: "4.5",
    description: "",
    tags: "",
    imageUrl: "",
  });

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image");
      return "";
    }

    try {
      const storageRef = ref(storage, `restaurant-images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
      return "";
    }
  };

  const addRestaurant = async () => {
    if (!restaurant.name || !restaurant.address || !restaurant.cuisine) {
      return toast.error("Name, Cuisine, and Address are required");
    }

    setLoading(true);
    try {
      const imageUrl = await handleImageUpload();
      
      const restaurantRef = collection(fireDB, "restaurants");
      await addDoc(restaurantRef, {
        ...restaurant,
        tags: restaurant.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });

      toast.success("Restaurant added successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding restaurant:", error);
      toast.error("Failed to add restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-8">
      <div className="bg-white shadow-2xl border-2 border-orange-300 px-8 py-6 rounded-2xl w-[90%] md:w-[70%] lg:w-[50%]">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Store className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-extrabold text-orange-600">Add New Restaurant</h2>
          </div>
          <p className="text-gray-500 text-sm">Partner with us and grow your business</p>
        </div>

        <div className="space-y-4">
          {/* Restaurant Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Restaurant Name *</label>
            <input
              type="text"
              value={restaurant.name}
              onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
              placeholder="e.g., The Golden Fork"
              className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine Type *</label>
            <input
              type="text"
              value={restaurant.cuisine}
              onChange={(e) => setRestaurant({ ...restaurant, cuisine: e.target.value })}
              placeholder="e.g., Italian, Indian, Chinese"
              className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
            <textarea
              value={restaurant.address}
              onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
              placeholder="Full address with city and state"
              className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              rows="2"
            />
          </div>

          {/* Contact Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={restaurant.phone}
                onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
                placeholder="+1 234 567 8900"
                className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={restaurant.email}
                onChange={(e) => setRestaurant({ ...restaurant, email: e.target.value })}
                placeholder="info@restaurant.com"
                className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>
          </div>

          {/* Timing & Rating */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Timings</label>
              <input
                type="text"
                value={restaurant.timing}
                onChange={(e) => setRestaurant({ ...restaurant, timing: e.target.value })}
                placeholder="e.g., 10:00 AM - 11:00 PM"
                className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={restaurant.rating}
                onChange={(e) => setRestaurant({ ...restaurant, rating: e.target.value })}
                className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={restaurant.description}
              onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })}
              placeholder="Tell us about your restaurant..."
              className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              rows="3"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={restaurant.tags}
              onChange={(e) => setRestaurant({ ...restaurant, tags: e.target.value })}
              placeholder="e.g., Veg, Family Friendly, Outdoor Seating"
              className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Restaurant Image</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              {imageFile && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={addRestaurant}
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all shadow-md disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add Restaurant"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
