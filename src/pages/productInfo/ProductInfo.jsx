import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";



const ProductInfo = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Use user-specific keys
  const userPrefix = user ? `${user.uid}_` : "";

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Track the clicked image

  const { id } = useParams();

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
    }
  }, [cartItems, userPrefix, user]);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const productTemp = await getDoc(doc(fireDB, "products", id));
        setProduct({ ...productTemp.data(), id: productTemp.id });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getProductData();
  }, [id, setLoading]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <>
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          </>
        ) : (
          <>
            <div className="w-[80%] px-4 mx-auto">
              <div className="flex flex-wrap mb-24 -mx-4">
                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0 ">
                  <div className="">
                    <div className="">
                    

                      <div className="grid grid-cols-2 gap-4">
                        {product?.productImageUrl?.map((img, index) => (
                          <img
                            key={index}
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            src={img}
                            alt={`Product  ${index + 1}`}
                            onClick={() => setSelectedImage(img)}
                          />
                        ))}
                      </div>

                      
                    </div>                   
                  </div>

                  
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="lg:pl-20">
                    <div className="mb-6 ">
                      <h2 className="max-w-xl flex mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                        {product?.title}
                      </h2>

                      <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                        <span>₹ {product?.price}</span>
                      </p>
                      <p className="ml-2 text-gray-500">
                        {product?.totalQuantity < 10
                          ? `only ${product?.totalQuantity} left`
                          : `x ${product?.totalQuantity}  left`}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                        Description :
                      </h2>
                      <p style={{ whiteSpace: "pre-line" }}>
                        {product?.description}
                      </p>
                    </div>

                    <div className="mb-6 " />
                    <div className="flex flex-wrap items-center mb-6">
                      {cartItems.some((p) => p.id === product.id) ? (
                        <button
                          onClick={() => deleteCart(product)}
                          className="w-full px-4 py-3 text-center text-white bg-red-900 border border-red-600  hover:bg-red-800 hover:text-gray-100  rounded-xl"
                        >
                          Delete to cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(product)}
                          className="w-full px-4 py-3 text-center text-white bg-green-900 border border-green-600  hover:bg-green-800 hover:text-gray-100  rounded-xl"
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Size"
            className="max-w-full max-h-full rounded-lg"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </Layout>
  );
};

export default ProductInfo;
