import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash, ShoppingCart, Wallet, PartyPopper, UtensilsCrossed } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection,doc,getDoc,updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import EmptyCart from "../../components/assets/emptycart.png";

const CartPage = () => {
 
  const user = JSON.parse(localStorage.getItem("users"));
  // const userPrefix = user ? `${user.uid}_` : ""; // User-specific key prefix

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // New update quantity
  // const updateQuantity = async (id, operation) => {
  //       try {
  //           const productRef = doc(fireDB, "products", id);
  //           const productSnap = await getDoc(productRef);
    
  //           if (productSnap.exists()) {
  //               const currentQuantity = productSnap.data().quantity;
    
  //               // Perform the operation (add or subtract)
  //               const updatedQuantity = operation === "decrement" 
  //                   ? currentQuantity - 1 
  //                   : currentQuantity + 1;
    
  //               // Update the quantity in the database
  //               await updateDoc(productRef, { quantity: updatedQuantity });
  //           } else {
  //               toast.error("Product not found in the database!");
  //           }
  //       } catch (error) {
  //           console.error("Error updating totalQuantity:", error);
  //           toast.error("Failed to update product quantity!");
  //       }
  //   };


  // Fetch totalQuantity directly from Firestore for validation
  const fetchTotalQuantity = async (id) => {
    try {
      const productRef = doc(fireDB, "products", id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        return productSnap.data().totalQuantity;
      } else {
        console.error("Product not found in Firestore!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching totalQuantity:", error);
      return null;
    }
  };

  const deleteCart = async(item) => {
    dispatch(deleteFromCart(item));
     // Update quantity to 1 for all cart items
     await Promise.all(
      cartItems.map(async (item) => {
        const productRef = doc(fireDB, "products", item.id);
        await updateDoc(productRef, { quantity: 1 });
      })
    );
    toast.success("Delete cart");
  };

  

  // Increment item quantity
  const handleIncrement = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    const totalQuantity = await fetchTotalQuantity(id);

    if (item && item.quantity < totalQuantity) {
      dispatch(incrementQuantity(id));
     // Update local storage
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      toast.error("Cannot add more than available stock.");
    }
  };
 // Decrement item quantity
  const handleDecrement = async(id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      // Update the product quantity in the database (totalQuantity)
    
    dispatch(decrementQuantity(id));
    // Update local storage
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    }else {
      toast.error("Minimum quantity is 1.");
    }
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = async() => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All Fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "Processing",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    // Load Razorpay script and initiate payment
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = async () => {
      const options = {
        key: "rzp_test_oy0ogDNk4xSPEB",
        key_secret: "e5rj5EgNTLhgxJXDfs2wj7DD",
        amount: parseInt(cartTotal * 100), // Total amount in paise
        currency: "INR",
        name: "Astra-Mart",
        description: "Test Transaction",
        handler:async function (response) {
          toast.success("Order Placed");
          

          // Save order information to Firestore
          try {
          
            await Promise.all(
              cartItems.map(async (item) => {
                const productRef = doc(fireDB, "products", item.id);
                const productSnap = await getDoc(productRef);
        
                if (productSnap.exists()) {
                  const currentTotalQuantity = productSnap.data().totalQuantity;
                  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                  const localItem = localCart.find((localItem) => localItem.id === item.id);
                  const localQuantity = localItem ? localItem.quantity : 0;
        
                  const updatedQuantity = currentTotalQuantity - localQuantity;
        
                  if (updatedQuantity >= 0) {
                    await updateDoc(productRef, { totalQuantity: updatedQuantity });
                  } else {
                    console.error("Insufficient stock in Firestore.");
                    toast.error("Error updating stock. Please try again.");
                  }
                }
              })
            );

            // Save order information to Firestore
            const paymentId = response.razorpay_payment_id;
            await addDoc(collection(fireDB, "order"), { ...orderInfo, paymentId });

        
            // Clear cart and reset local storage
            cartItems.forEach((item) => dispatch(deleteFromCart(item)));
            localStorage.setItem("cart", JSON.stringify([]));
            // Navigate to homepage page 
            navigate("/");
           
          } catch (error) {
            console.error("Error processing order:", error);
            toast.error("Error placing order.");
          }
        },
        theme: {
          color: "#00008B",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    document.body.appendChild(script);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <ShoppingCart className="w-10 h-10" /> Your Cart
            </h1>
            <p className="text-gray-600">Review your delicious selections before checkout</p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => {
                    const { id, title, price, productImageUrl, quantity, category } = item;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100"
                      >
                        <div className="p-6">
                          <div className="flex gap-6">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                              <img
                                src={productImageUrl}
                                alt={title}
                                className="w-28 h-28 rounded-xl object-cover border-2 border-orange-200 shadow-sm"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {title}
                                  </h3>
                                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold capitalize">
                                    {category}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-orange-600">
                                    ₹{price * quantity}
                                  </p>
                                  <p className="text-sm text-gray-500">₹{price} each</p>
                                </div>
                              </div>

                              {/* Quantity Controls & Remove */}
                              <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                  <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-1 border border-orange-200">
                                    <button
                                      onClick={() => handleDecrement(id)}
                                      type="button"
                                      className="w-8 h-8 rounded-lg bg-white hover:bg-orange-500 hover:text-white font-bold text-orange-600 transition-all duration-200 shadow-sm"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      className="w-12 h-8 text-center font-bold text-gray-900 bg-transparent border-none focus:outline-none"
                                      value={quantity}
                                      readOnly
                                    />
                                    <button
                                      onClick={() => handleIncrement(id)}
                                      type="button"
                                      className="w-8 h-8 rounded-lg bg-white hover:bg-orange-500 hover:text-white font-bold text-orange-600 transition-all duration-200 shadow-sm"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <button
                                  onClick={() => deleteCart(item)}
                                  type="button"
                                  className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-200 font-semibold"
                                >
                                  <Trash size={18} />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <img
                    src={EmptyCart}
                    alt="Empty Cart"
                    className="w-64 h-64 mx-auto mb-6 opacity-80"
                  />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Your Cart is Empty!
                  </h2>
                  <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                  <button
                    onClick={() => navigate('/allproduct')}
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    Browse Menu <UtensilsCrossed className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Wallet className="w-6 h-6" /> Bill Summary
                    </h2>
                  </div>

                  {/* Bill Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">
                        Items ({cartItemTotal})
                      </span>
                      <span className="text-gray-900 font-bold">₹ {cartTotal}</span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Delivery Fee</span>
                      <span className="text-green-600 font-bold flex items-center gap-1">
                        FREE <PartyPopper className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Platform Fee</span>
                      <span className="text-gray-900 font-bold">₹ 0</span>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total Amount</span>
                        <span className="text-2xl font-bold text-orange-600">₹ {cartTotal}</span>
                      </div>
                    </div>

                    {/* Savings Badge */}
                    {cartTotal > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <p className="text-green-700 font-semibold flex items-center justify-center gap-2">
                          <PartyPopper className="w-4 h-4" /> You're saving on delivery!
                        </p>
                      </div>
                    )}

                    {/* Place Order Button */}
                    <div className="pt-4">
                      {user ? (
                        <div>
                          {cartItems.length > 0 ? (
                            <BuyNowModal
                              addressInfo={addressInfo}
                              setAddressInfo={setAddressInfo}
                              buyNowFunction={buyNowFunction}
                            />
                          ) : (
                            <button
                              onClick={() => toast.error("Add items to cart first!")}
                              className="w-full bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                              disabled
                            >
                              Place Order <UtensilsCrossed className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <Navigate to="/login" />
                      )}
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Safe and secure payments</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>100% authentic food</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Fast delivery guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
