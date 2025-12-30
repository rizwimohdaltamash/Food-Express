import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { ShoppingCart, Trash2, Star, Bike, Flame } from "lucide-react";

const HomePageProductCard = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userPrefix = user ? `${user.uid}_` : "";

  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Removed from cart");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
    }
  }, [cartItems, userPrefix, user]);

  return (
    <div className="mt-10">
      {/* Heading */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white shadow-md">
        <h1 className="text-center py-3 mb-5 text-2xl md:text-3xl font-bold tracking-wide flex items-center justify-center gap-2">
          <Flame className="w-6 h-6" />
          Popular Dishes Near You
        </h1>
      </div>

      {/* Products Grid */}
      <section className="text-gray-700 body-font bg-orange-50 py-5">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex justify-center">{loading && <Loader />}</div>
          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              const isInCart = cartItems.some((p) => p.id === item.id);

              return (
                <div key={index} className="p-2 w-1/2 md:w-1/4 lg:w-1/4">
                  <div className="h-full border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white hover:border-orange-400">
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="h-48 md:h-64 lg:h-64 w-full object-cover cursor-pointer rounded-t-2xl hover:scale-105 transition-transform"
                      src={productImageUrl}
                      alt={title}
                    />

                    <div className="p-4">
                      <h1 className="title-font text-lg font-bold text-gray-900 mb-2 truncate">
                        {title}
                      </h1>

                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-md font-bold text-orange-600">
                          ₹ {price}
                        </h2>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-semibold text-gray-700">4.5</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1 w-fit">
                          <Bike className="w-3 h-3" /> 30 mins
                        </span>
                      </div>

                      <div className="flex justify-center">
                        {isInCart ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
