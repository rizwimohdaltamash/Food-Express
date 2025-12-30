import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { Calendar, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import Layout from "../../components/layout/Layout";

const BookingManagement = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const q = collection(fireDB, "bookings");
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

  const updateBookingStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      await updateDoc(doc(fireDB, "bookings", id), {
        status: newStatus,
      });
      toast.success(`Booking ${newStatus.toLowerCase()}`);
      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Layout>
    <div className="py-5 flex justify-center items-center">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
          <div className="p-5 bg-orange-500 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-7 h-7" />
              Table Bookings
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-10 bg-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-orange-100 border-b-2 border-orange-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">S.No</th>
                    <th scope="col" className="px-6 py-3">Customer</th>
                    <th scope="col" className="px-6 py-3">Restaurant</th>
                    <th scope="col" className="px-6 py-3">Date & Time</th>
                    <th scope="col" className="px-6 py-3">Guests</th>
                    <th scope="col" className="px-6 py-3">Contact</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{booking.name}</p>
                          <p className="text-xs text-gray-500">{booking.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold">{booking.restaurantName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span>{booking.bookingDate}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>{booking.bookingTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {booking.guests}
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.phone}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === "Pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all flex items-center gap-1"
                              title="Confirm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Confirm
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all flex items-center gap-1"
                              title="Cancel"
                            >
                              <XCircle className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        )}
                        {booking.status !== "Pending" && (
                          <span className="text-gray-400 text-xs">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && bookings.length === 0 && (
            <div className="text-center py-16 bg-white">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default BookingManagement;
