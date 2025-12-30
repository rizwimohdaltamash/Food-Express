import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { CgProfile } from "react-icons/cg";
import { UtensilsCrossed } from "lucide-react";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-10">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-orange-600 via-red-500 to-orange-500 text-white py-6 rounded-2xl border-2 border-orange-400 shadow-lg hover:shadow-orange-400/30 transition-all duration-300">
          <div className="flex flex-col justify-center items-center space-y-3">
            <CgProfile size={92} className="text-yellow-200" />
            <h1 className="text-2xl font-bold tracking-wide text-yellow-100">Customer Profile</h1>

            <div className="text-center space-y-2">
              <p className="text-lg">
                <span className="text-yellow-200 font-semibold">Name:</span> {user?.name}
              </p>
              <p className="text-lg">
                <span className="text-yellow-200 font-semibold">Email:</span> {user?.email}
              </p>
              <p className="text-lg">
                <span className="text-yellow-200 font-semibold">Date:</span> {user?.date}
              </p>
              <p className="text-lg">
                <span className="text-yellow-200 font-semibold">Role:</span> {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-6 flex items-center justify-center gap-2">Your Orders <UtensilsCrossed className="w-8 h-8" /></h2>
          {loading && (
            <div className="flex justify-center mb-6">
              <Loader />
            </div>
          )}

          {getAllOrder
            .filter((obj) => obj.userid === user?.uid)
            .map((order, i) => (
              <div key={i} className="mb-8">
                {order.cartItems.map((item, j) => {
                  const { id, date, quantity, price, title, productImageUrl, category } = item;
                  const { status } = order;

                  return (
                    <div
                      key={j}
                      className="flex flex-col md:flex-row overflow-hidden rounded-xl border border-orange-800 shadow-md bg-gray-950 hover:shadow-orange-600/40 transition duration-300"
                    >
                      {/* Left Info */}
                      <div className="w-full md:max-w-xs bg-gray-900 border-r border-orange-700 p-6 text-white">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-yellow-200">Order ID</p>
                            <p className="text-sm font-medium break-words">#{id}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-yellow-200">Date</p>
                            <p className="text-sm font-medium">{date}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-yellow-200">Total</p>
                            <p className="text-sm font-medium">₹ {price * quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-yellow-200">Status</p>
                            <p
                              className={`text-lg font-bold first-letter:uppercase ${
                                status === "Processing"
                                  ? "text-yellow-400"
                                  : status === "Out for Delivery"
                                  ? "text-orange-400"
                                  : status === "Delivered"
                                  ? "text-green-400"
                                  : status === "Cancelled"
                                  ? "text-red-400"
                                  : "text-gray-400"
                              }`}
                            >
                              {status}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Info */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                          <div className="flex items-center space-x-5">
                            <img
                              src={productImageUrl}
                              alt={title}
                              className="h-32 w-32 rounded-lg border border-orange-700 object-contain"
                            />
                            <div>
                              <h3 className="text-lg font-bold text-orange-300">{title}</h3>
                              <p className="text-sm text-gray-400">{category}</p>
                              <p className="text-sm text-gray-400 mt-2">Qty: {quantity}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-orange-400">₹ {price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
