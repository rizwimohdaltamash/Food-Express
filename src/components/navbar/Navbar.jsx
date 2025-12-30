import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { UtensilsCrossed, ChevronDown } from "lucide-react";
import { resetCart } from "../../redux/cartSlice";
import { useSidebar } from "../../context/SidebarProvider.jsx";
import { useState } from "react";

const Navbar = () => {
  // User data
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userPrefix = user ? `${user.uid}_` : "";

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Logout function
  const logout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem(`${userPrefix}cart`);
    localStorage.removeItem("cart");
    dispatch(resetCart());
    navigate("/login");
  };

  // Redux cart items
  const cartItems = useSelector((state) => state.cart);

  // Desktop Nav Links
  const navList = (
    <ul className="flex flex-row justify-evenly text-center items-center lg:space-x-5 text-white font-medium text-md lg:px-3 lg:mx-0 mx-2 w-full">
      <li className="hover:text-yellow-300 text-xs lg:text-base">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="hover:text-yellow-300 text-xs lg:text-base">
        <Link to={"/allproduct"}>Menu</Link>
      </li>
      {user?.role === "user" && (
        <li 
          className="relative group"
          onMouseEnter={() => setIsUserDropdownOpen(true)}
          onMouseLeave={() => setIsUserDropdownOpen(false)}
        >
          <button className="hover:text-yellow-300 text-xs lg:text-base flex items-center gap-1 transition-colors">
            Restaurants <ChevronDown size={16} className={`transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-56 z-50">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-orange-100 animate-fadeIn">
                <div className="py-2">
                  <Link
                    to={"/restaurants"}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all font-medium"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Browse Restaurants
                  </Link>
                  <Link
                    to={"/user-bookings"}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all font-medium"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Bookings
                  </Link>
                </div>
              </div>
            </div>
          )}
        </li>
      )}
      {!user && (
        <li className="hover:text-yellow-300 text-xs lg:text-base">
          <Link to={"/restaurants"}>Restaurants</Link>
        </li>
      )}
      {!user && (
        <>
          <li className="hover:text-yellow-300 text-xs lg:text-base">
            <Link to={"/signup"}>Signup</Link>
          </li>
          <li className="hover:text-yellow-300 text-xs lg:text-base">
            <Link to={"/login"}>Login</Link>
          </li>
        </>
      )}
      {user?.role === "user" && (
        <li className="hover:text-yellow-300 text-xs lg:text-base">
          <Link to={"/user-dashboard"}>Orders</Link>
        </li>
      )}
      {user?.role === "admin" && (
        <li 
          className="relative group"
          onMouseEnter={() => setIsAdminDropdownOpen(true)}
          onMouseLeave={() => setIsAdminDropdownOpen(false)}
        >
          <button className="hover:text-yellow-300 text-xs lg:text-base flex items-center gap-1 transition-colors">
            Admin <ChevronDown size={16} className={`transition-transform duration-200 ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isAdminDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-56 z-50">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-orange-100 animate-fadeIn">
                <div className="py-2">
                <Link
                  to={"/admin-dashboard"}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all font-medium"
                  onClick={() => setIsAdminDropdownOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link
                  to={"/restaurant-management"}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all font-medium"
                  onClick={() => setIsAdminDropdownOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Restaurants
                </Link>
                <Link
                  to={"/booking-management"}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all font-medium"
                  onClick={() => setIsAdminDropdownOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Bookings
                </Link>
              </div>
            </div>
            </div>
          )}
        </li>
      )}
      {user && (
        <li
          onClick={logout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md cursor-pointer text-xs lg:text-base font-medium shadow-md transition-transform transform hover:scale-105"
        >
          Logout
        </li>
      )}
      <li className="text-xs lg:text-base relative">
        <Link to={"/cart"}>
          <BsCart2 size={26} className="text-white hover:text-yellow-300" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-orange-500 text-white rounded-full px-2 py-0.5 text-xs">
              {cartItems.length}
            </span>
          )}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 sticky top-0 shadow-lg z-50">
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center py-3 lg:px-3">
        {/* Logo Section */}
        <div className="left hidden md:flex lg:flex py-3 lg:py-0 lg:w-[15%]">
          <Link to={"/"}>
            <div className="flex flex-row justify-center items-center gap-2">
              <UtensilsCrossed className="text-white text-4xl" size={40} />
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                FoodExpress
              </h2>
            </div>
          </Link>
        </div>

        {/* Mobile Navbar Top Row */}
        <div className="md:hidden lg:hidden flex flex-row w-[100%] items-center justify-between px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
          >
            {isSidebarOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>

          <div className="flex items-center gap-2">
            <UtensilsCrossed className="text-white text-3xl" size={30} />
            <h2 className="text-2xl font-bold text-white">
              Food<span className="text-yellow-300">Express</span>
            </h2>
          </div>

          <Link to={"/cart"} className="relative text-white">
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-orange-500 text-white rounded-full px-1 py-0.5 text-xs">
                {cartItems.length}
              </span>
            )}
            <BsCart2 size={28} />
          </Link>
        </div>

        {/* Desktop Nav + Search */}
        <div className="hidden md:flex md:flex-row lg:flex lg:flex-row flex-col md:justify-end lg:justify-end md:items-center lg:items-center lg:w-[85%] w-full">
          <div className="lg:w-[50%] order-2 lg:order-1">
            <SearchBar />
          </div>
          <div className="order-1 md:order-2 lg:order-2 flex justify-center mb-2 md:mb-0 lg:mb-0 md:w-[50%] lg:w-[50%] w-full">
            {navList}
          </div>
        </div>

        {/* Sidebar (Mobile) */}
        <div
          className={`bg-orange-50 fixed top-0 left-0 w-56 h-full z-50 shadow-lg md:hidden lg:hidden transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-8 p-6 mt-6 relative text-orange-900 font-medium">
            <div className="absolute top-0 left-48">
              <AiOutlineClose
                size={24}
                onClick={() => setIsSidebarOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 text-lg hover:text-orange-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaHome /> Home
            </Link>

            <Link
              to="/allproduct"
              className="flex items-center gap-2 text-lg hover:text-orange-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <AiOutlineInfoCircle /> Menu
            </Link>

            {user?.role === "user" && (
              <Link
                to="/user-dashboard"
                className="flex items-center gap-2 text-lg hover:text-orange-600"
                onClick={() => setIsSidebarOpen(false)}
              >
                <RiAdminLine /> My Orders
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-lg hover:text-orange-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <CiLogin /> Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 text-lg hover:text-orange-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <GoGoal /> Signup
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin-dashboard"
                  className="flex items-center gap-2 text-lg hover:text-orange-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <RiAdminLine /> Admin
                </Link>
                <Link
                  to="/sellerdata"
                  className="flex items-center gap-2 text-lg hover:text-orange-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdAdminPanelSettings /> Restaurants
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-orange-600 text-white rounded-md py-2 hover:bg-orange-700 transition"
              >
                <CiLogout /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
