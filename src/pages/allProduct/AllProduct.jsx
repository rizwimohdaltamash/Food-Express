import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import { UtensilsCrossed, Star, Bike, ShoppingCart, Trash2 } from "lucide-react";



const AllProduct = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const navigate = useNavigate();

  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

 
  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    // updateTotalQuantity(item.id, "decrement"); // Reduce totalQuantity by 1
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    // updateTotalQuantity(item.id, "increment"); // Increase totalQuantity by 1
    toast.success("Delete cart");
  };

  // console.log(cartItems)

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
    }
  }, [cartItems, userPrefix, user]);

  return (
    <Layout>
      <div className="py-8 bg-orange-50 min-h-screen">
        {/* Heading  */}
        <div className="">
          <h1 className="text-center mb-5 text-3xl font-bold text-orange-600 flex items-center justify-center gap-2">
            <UtensilsCrossed className="w-8 h-8" /> Full Menu
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center">{loading && <Loader />}</div>
            <div className="flex flex-wrap -m-4">
              {getAllProduct.map((item, index) => {
                const { id, title, price, productImageUrl } = item;
                return (
                  <div key={index} className="p-1 w-2/4 md:w-1/4 lg:w-1/4">
                    <div className="h-full border-2 border-orange-200 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 bg-white">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="h-32 md:h-60 lg:h-60 w-full object-cover"
                        src={productImageUrl[0]}
                        alt="blog"
                      />
                      <div className="p-4">
                        
                        <h1 className="title-font text-xl font-bold text-gray-900 mb-2">
                          {title}
                        </h1>

                        <div className="flex justify-between items-center mb-2">
                          <h1 className="text-md font-bold text-orange-600">
                            ₹ {price}
                          </h1>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-semibold">4.5</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                            <Bike className="w-3 h-3" />
                            30 mins
                          </span>
                        </div>

                        <div className="flex justify-center ">
                          {cartItems.some((p) => p.id === item.id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="bg-red-500 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold shadow-md flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className="bg-orange-500 hover:bg-orange-600 w-full text-white py-[4px] rounded-lg font-bold shadow-md flex items-center justify-center gap-1"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add To Cart
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
    </Layout>
  );
};

export default AllProduct;
