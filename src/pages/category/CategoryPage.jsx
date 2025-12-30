import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { Star, Bike } from "lucide-react";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();

  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );

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
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        {/* main  */}
        {loading ? (
          <>
            <div className="flex justify-center">
              <Loader />
            </div>
          </>
        ) : (
          <>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-5 mx-auto ">
                <div className="flex flex-wrap -m-4  justify-center">
                  {filterProduct.length > 0 ? (
                    <>
                      {filterProduct.map((item, index) => {
                        const { id, title, price, productImageUrl } = item;
                        return (
                          <div key={index} className="p-1 w-2/4 md:w-1/4 lg:w-1/4">
                            <div className="h-full border-2 border-orange-200 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all">
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
                                  <h1 className="text-md font-semibold text-orange-600">
                                    ₹ {price}
                                  </h1>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    <span className="text-sm font-semibold">4.5</span>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                                    <Bike className="w-3 h-3" /> 30 mins
                                  </span>
                                </div>

                                <div className="flex justify-center ">
                                  {cartItems.some((p) => p.id === item.id) ? (
                                    <button
                                      onClick={() => deleteCart(item)}
                                      className=" bg-red-900 hover:bg-red-800 w-full text-white py-[4px] rounded-lg font-bold"
                                    >
                                      Delete To Cart
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => addCart(item)}
                                      className=" bg-green-900 hover:bg-green-800 w-full text-white  py-[4px] rounded-lg font-bold"
                                    >
                                      Add To Cart
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div>
                      <div className="flex justify-center">
                        <img
                          className=" mb-2"
                          src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                          alt=""
                        />
                      </div>
                      <h1 className=" text-black text-xl">
                        No {categoryname} product found
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
