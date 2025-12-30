import {
   BrowserRouter as Router,
   Route,
   Routes,
   } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import UserDashboard from "./pages/user/UserDashboard";
import UserBookings from "./pages/user/UserBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import AddSampleDataPage from "./pages/admin/AddSampleDataPage";
import RestaurantList from "./pages/restaurants/RestaurantList";
import RestaurantDetails from "./pages/restaurants/RestaurantDetails";
import AddRestaurant from "./pages/admin/AddRestaurant";
import RestaurantManagement from "./pages/admin/RestaurantManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/protectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/protectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";

function App() {
  return (
    <MyState>
      <Router>
        <ScrollTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} /> 
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/add-sample-data" element={<AddSampleDataPage />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          <Route
            path="/user-bookings"
            element={
              <ProtectedRouteForUser>
                <UserBookings />
              </ProtectedRouteForUser>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/add-restaurant"
            element={
              <ProtectedRouteForAdmin>
                <AddRestaurant />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/restaurant-management"
            element={
              <ProtectedRouteForAdmin>
                <RestaurantManagement />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/booking-management"
            element={
              <ProtectedRouteForAdmin>
                <BookingManagement />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
          />
          <Route path="/add-sample-data" element={<AddSampleDataPage />} />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;
