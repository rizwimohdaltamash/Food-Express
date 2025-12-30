

import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, orderDelete } = context;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      {/* Page Heading */}
      <div className="py-5 text-center">
        <h1 className="text-4xl font-extrabold text-green-800 drop-shadow-sm">
          All Orders
        </h1>
        <p className="text-gray-600 mt-2">
          Manage and review all customer orders efficiently
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white border border-green-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
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
                "Phone",
                "Email",
                "Date",
                "Remove",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-sm font-semibold border-b border-green-700 text-center"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {getAllOrder.map((order) =>
              order.cartItems.map((item, index) => {
                const { id, productImageUrl, title, category, price, quantity } =
                  item;
                return (
                  <tr
                    key={index}
                    className="text-gray-700 border-b border-green-100 hover:bg-green-50 transition duration-200"
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center text-green-800 font-medium">
                      {id}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <img
                        src={productImageUrl}
                        alt="product"
                        className="w-16 h-16 object-cover mx-auto rounded-md border border-green-200"
                      />
                    </td>
                    <td className="px-4 py-2 text-center capitalize">
                      {title}
                    </td>
                    <td className="px-4 py-2 text-center capitalize">
                      {category}
                    </td>
                    <td className="px-4 py-2 text-center">₹{price}</td>
                    <td className="px-4 py-2 text-center">{quantity}</td>
                    <td className="px-4 py-2 text-center font-semibold text-green-700">
                      ₹{price * quantity}
                    </td>
                    <td
                      className={`px-4 py-2 text-center font-semibold ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="px-4 py-2 text-center capitalize">
                      {order.addressInfo.name}
                    </td>
                    <td className="px-4 py-2 text-center capitalize">
                      {order.addressInfo.address}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {order.addressInfo.pincode}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {order.addressInfo.mobileNumber}
                    </td>
                    <td className="px-4 py-2 text-center">{order.email}</td>
                    <td className="px-4 py-2 text-center">{order.date}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => orderDelete(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition duration-200 shadow-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
