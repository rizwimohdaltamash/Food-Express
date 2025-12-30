# 🍕 FoodExpress - Food Delivery & Restaurant Booking Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Firebase-10.12.3-orange?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/Redux-2.2.6-purple?style=for-the-badge&logo=redux" alt="Redux" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
</div>

<br />

<p align="center">
  <strong>A modern, full-featured food delivery and restaurant booking platform built with React and Firebase</strong>
</p>

<p align="center">
  Browse delicious meals, order food online, explore restaurants, and book tables - all in one place!
</p>

---

## ✨ Features

### 👥 For Customers
- 🛒 **Browse Menu** - Explore a wide variety of food items across different categories
- 🛍️ **Shopping Cart** - Add items to cart with real-time updates and Redux state management
- 🍽️ **Restaurant Discovery** - Browse restaurants with ratings, cuisine types, and location
- 📅 **Table Booking** - Reserve tables at your favorite restaurants
- 📦 **Order Tracking** - View order history and current order status
- 🔍 **Search & Filter** - Find food items by category or search
- 💳 **Buy Now** - Quick checkout for single items
- 👤 **User Dashboard** - Manage orders and bookings from one place

### 🔐 Authentication
- ✅ Secure user registration and login
- 🔒 Protected routes for authenticated users
- 👨‍💼 Role-based access control (Admin/User)

### 🎛️ Admin Panel
- 📊 **Dashboard** - Overview of products, orders, and users
- ➕ **Product Management** - Add, update, and delete food items
- 🏪 **Restaurant Management** - Manage restaurant listings
- 📅 **Booking Management** - Confirm or cancel table reservations
- 👥 **User Management** - View all registered users
- 📈 **Order Management** - Update order status and track deliveries

### 🎨 UI/UX
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎨 Modern orange/red food-themed color scheme
- ✨ Smooth animations with Framer Motion
- 🔽 Dropdown navigation menus
- 🎯 Interactive hover effects and transitions
- 🌟 Professional icons from Lucide React

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router DOM 6.24.0** - Navigation and routing
- **Redux Toolkit 2.2.6** - State management
- **Tailwind CSS 3.4.4** - Styling framework
- **Framer Motion 12.23.24** - Animations
- **Lucide React 0.400.0** - Icon library

### Backend & Database
- **Firebase 10.12.3**
  - Firestore - NoSQL database
  - Authentication - User management
  - Storage - Image uploads

### Additional Libraries
- **React Hot Toast** - Toast notifications
- **React Tabs 6.0.2** - Tab components
- **Material Tailwind 2.1.9** - Enhanced UI components

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foodexpress.git
   cd foodexpress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore, Authentication, and Storage
   - Copy your Firebase configuration
   - Update `src/firebase/FirebaseConfig.jsx` with your credentials:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Run the development server**
   ```bash
   npm start
   ```
   
   Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```
   
   Builds the app for production to the `build` folder. The build is optimized for best performance.

---

## 📁 Project Structure

```
ShopifyAssesment-main/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── admin/           # Admin-specific components
│   │   ├── navbar/          # Navigation bar
│   │   ├── footer/          # Footer component
│   │   ├── layout/          # Layout wrapper
│   │   ├── loader/          # Loading spinner
│   │   └── ...
│   ├── pages/
│   │   ├── home/            # Home page
│   │   ├── admin/           # Admin pages
│   │   ├── user/            # User dashboard
│   │   ├── restaurants/     # Restaurant pages
│   │   ├── cart/            # Shopping cart
│   │   └── registration/    # Login/Signup
│   ├── context/             # React Context API
│   ├── redux/               # Redux store and slices
│   ├── firebase/            # Firebase configuration
│   ├── protectedRoute/      # Route protection
│   ├── utils/               # Utility functions
│   ├── App.js               # Main app component
│   └── index.js             # Entry point
├── package.json
└── tailwind.config.js
```

---

## 🎯 Usage

### Creating an Account
1. Click on "Signup" in the navigation bar
2. Fill in your details (name, email, password)
3. Register as a user (admin registration requires special access)

### Ordering Food
1. Browse the menu from the home page
2. Click on categories to filter items
3. Add items to cart using the "Add to Cart" button
4. View cart and proceed to checkout
5. Track your order from the user dashboard

### Booking a Restaurant
1. Navigate to "Restaurants" in the navbar
2. Browse available restaurants
3. Click on a restaurant to view details
4. Click "Book Table" and fill in the booking form
5. View your bookings under "My Bookings"

### Admin Functions
1. Login with admin credentials
2. Access admin panel from the dropdown menu
3. Manage products, restaurants, and bookings
4. Update order statuses
5. View user statistics

---

## 🔥 Key Features Explained

### State Management
- **Redux Toolkit** for global cart state
- **React Context** for user, products, and loading states
- **Local Storage** for cart persistence

### Database Collections
- `products` - Food items and menu
- `order` - Customer orders
- `user` - User accounts
- `restaurants` - Restaurant listings
- `bookings` - Table reservations

### Protected Routes
- User routes require authentication
- Admin routes require admin role
- Automatic redirect to login if unauthorized

### Image Upload
- Firebase Storage integration
- Support for single image uploads
- Automatic URL generation and storage

---

## 🎨 Color Scheme

- **Primary Orange**: `#FF6B35`
- **Primary Red**: `#E63946`
- **Accent Yellow**: `#FFB627`
- **Light Background**: `#FFF8F0`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Tailwind CSS for styling utilities
- Lucide for beautiful icons
- All contributors and supporters

---

<div align="center">
  <p>Made with ❤️ and React</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
#
