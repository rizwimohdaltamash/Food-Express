import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { Calendar, Users, Clock, Phone, Mail } from "lucide-react";

const UserBookings = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("users"));

  const fetchUserBookings = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "bookings"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const bookingsArray = [];
      querySnapshot.forEach((doc) => {
        bookingsArray.push({ ...doc.data(), id: doc.id });
      });
      setBookings(bookingsArray.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
    // eslint-disable-next-line
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Calendar className="w-8 h-8" />
                My Restaurant Bookings
              </h1>
              <p className="mt-2 text-orange-100">View all your table reservations</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-xl font-semibold">No bookings yet</p>
                <p className="text-gray-400 mt-2">Book a table at your favorite restaurant!</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {bookings.map((booking, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all hover:border-orange-300"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="flex-1 min-w-[250px]">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {booking.restaurantName}
                        </h3>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span className="font-semibold">Date:</span>
                            <span>{booking.bookingDate}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="font-semibold">Time:</span>
                            <span>{booking.bookingTime}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4 text-orange-500" />
                            <span className="font-semibold">Guests:</span>
                            <span>{booking.guests} people</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-[250px]">
                        <h4 className="font-semibold text-gray-700 mb-2">Contact Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4 text-orange-500" />
                            <span>{booking.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">{booking.email}</span>
                          </div>
                        </div>

                        {booking.specialRequest && (
                          <div className="mt-3">
                            <p className="text-sm font-semibold text-gray-700">Special Request:</p>
                            <p className="text-sm text-gray-600 italic">{booking.specialRequest}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                        <p className="text-xs text-gray-400">Booked on {booking.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserBookings;
