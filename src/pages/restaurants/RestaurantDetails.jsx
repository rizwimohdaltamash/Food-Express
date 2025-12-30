import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { Star, MapPin, Clock, Phone, Mail, ChefHat } from "lucide-react";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequest: "",
  });

  const user = JSON.parse(localStorage.getItem("users"));

  useEffect(() => {
    const getRestaurant = async () => {
      setLoading(true);
      try {
        const docRef = doc(fireDB, "restaurants", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRestaurant({ ...docSnap.data(), id: docSnap.id });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getRestaurant();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a table");
      navigate("/login");
      return;
    }

    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.date || !bookingData.time) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(fireDB, "bookings"), {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingDate: bookingData.date,
        bookingTime: bookingData.time,
        guests: bookingData.guests,
        specialRequest: bookingData.specialRequest,
        restaurantId: id,
        restaurantName: restaurant.name,
        userId: user.uid,
        userEmail: user.email,
        status: "Pending",
        createdAt: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });

      toast.success("Booking request sent successfully!");
      setShowBookingModal(false);
      setBookingData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        specialRequest: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Booking failed. Please try again.");
    }
    setLoading(false);
  };

  if (!restaurant) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Restaurant Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={restaurant.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg">
                      <Star className="w-5 h-5 fill-white" />
                      <span className="font-bold">{restaurant.rating || "4.5"}</span>
                    </div>
                    <span className="text-gray-600">({restaurant.reviews || "100"}+ reviews)</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book a Table
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Cuisine</p>
                      <p className="font-semibold text-gray-900">{restaurant.cuisine || "Multi-Cuisine"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-semibold text-gray-900">{restaurant.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Timings</p>
                      <p className="font-semibold text-gray-900">{restaurant.timing || "10:00 AM - 11:00 PM"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{restaurant.phone || "+1 234 567 8900"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{restaurant.email || "info@restaurant.com"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {restaurant.description && (
                <div className="mt-8 p-6 bg-orange-50 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
                </div>
              )}

              {/* Tags */}
              {restaurant.tags && (
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Book a Table</h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                    <input
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Guests *</label>
                    <select
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    value={bookingData.specialRequest}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequest: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    rows="3"
                    placeholder="Any special requirements..."
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg disabled:bg-gray-400"
                  >
                    {loading ? "Booking..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RestaurantDetails;
