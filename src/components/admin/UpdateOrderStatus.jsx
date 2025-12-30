import { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";

const UpdateOrderStatus = () => {
  const context = useContext(myContext);
  const { getAllOrder, orderDelete } = context;

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(fireDB, "order", orderId);
      await updateDoc(orderRef, { status: newStatus });

      toast.success(`Status updated to "${newStatus}"`, {
        style: { background: "#e8f5e9", color: "#2e7d32", borderRadius: "8px" },
        icon: <CheckCircle className="w-5 h-5" />,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", {
        style: { background: "#ffebee", color: "#c62828", borderRadius: "8px" },
        icon: <XCircle className="w-5 h-5" />,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 font-semibold";
      case "Out for Delivery":
        return "text-blue-600 font-semibold";
      case "Cancelled":
        return "text-red-600 font-semibold";
      default:
        return "text-yellow-600 font-semibold";
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="py-5 text-center">
        <h1 className="text-3xl font-extrabold text-orange-600">
          All Orders
        </h1>
      </div>

      <div className="w-full overflow-x-auto px-4 mb-10">
        <table className="w-full text-left border border-collapse border-orange-400 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-100 text-orange-800">
              {[
                "S.No.",
                "Order Id",
                "Image",
                "Title",
                "Category",
                "Price",
                "Quantity",
                "Total Price",
                "Status",
                "Name",
                "Address",
                "Pincode",
                "Mobile No.",
                "Email",
                "Date",
                "Payment Id",
                "Remove",
              ].map((head, i) => (
                <th
                  key={i}
                  className="h-12 px-4 text-sm md:text-md border border-orange-300 font-bold text-center"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {getAllOrder.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-orange-50 border-b border-orange-200 transition duration-300"
              >
                <td className="h-12 px-4 text-center">{index + 1}</td>
                <td className="h-12 px-4 text-center">
                  {order.cartItems[0].id}
                </td>

                <td className="h-12 px-4 text-center">
                  <img
                    src={order.cartItems[0].productImageUrl}
                    alt="product"
                    className="h-[50px] mx-auto rounded-md shadow-sm"
                  />
                </td>

                <td className="h-12 px-4 text-center capitalize font-semibold">
                  {order.cartItems[0].title}
                </td>
                <td className="h-12 px-4 text-center capitalize">
                  {order.cartItems[0].category}
                </td>
                <td className="h-12 px-4 text-center">
                  ₹{order.cartItems[0].price}
                </td>
                <td className="h-12 px-4 text-center">
                  {order.cartItems[0].quantity}
                </td>
                <td className="h-12 px-4 text-center font-semibold">
                  ₹{order.cartItems[0].price * order.cartItems[0].quantity}
                </td>

                <td className="h-12 px-4 text-center">
                  <select
                    className={`border border-gray-400 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${getStatusColor(
                      order.status
                    )}`}
                    value={order.status || "Processing"}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="h-12 px-4 text-center">
                  {order.addressInfo.name}
                </td>
                <td className="h-12 px-4 text-center">
                  {order.addressInfo.address}
                </td>
                <td className="h-12 px-4 text-center">
                  {order.addressInfo.pincode}
                </td>
                <td className="h-12 px-4 text-center">
                  {order.addressInfo.mobileNumber}
                </td>
                <td className="h-12 px-4 text-center">{order.email}</td>
                <td className="h-12 px-4 text-center">
                  {order.addressInfo.date}
                </td>
                <td className="h-12 px-4 text-center">{order.paymentId}</td>

                <td className="h-12 px-4 text-center">
                  <button
                    onClick={() => orderDelete(order.id)}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-sm mx-auto"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
