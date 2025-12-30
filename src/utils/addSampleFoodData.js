import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

const sampleFoodData = [
  {
    title: "Margherita Pizza",
    price: "299",
    productImageUrl: ["https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500"],
    category: "pizza",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil. Thin crispy crust baked to perfection in a wood-fired oven.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Chicken Burger",
    price: "199",
    productImageUrl: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"],
    category: "burger",
    description: "Juicy grilled chicken patty with lettuce, tomatoes, cheese, and special sauce in a soft sesame bun. Served with crispy fries.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Veg Biryani",
    price: "249",
    productImageUrl: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"],
    category: "biryani",
    description: "Aromatic basmati rice cooked with mixed vegetables, fragrant spices, and saffron. Served with raita and curry.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Masala Dosa",
    price: "149",
    productImageUrl: ["https://images.unsplash.com/photo-1630383249896-424e482df921?w=500"],
    category: "breakfast",
    description: "Crispy South Indian crepe filled with spiced potato masala. Served with coconut chutney and sambar.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Paneer Tikka",
    price: "229",
    productImageUrl: ["https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500"],
    category: "starter",
    description: "Grilled cottage cheese cubes marinated in yogurt and Indian spices. Served with mint chutney.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Chicken Fried Rice",
    price: "199",
    productImageUrl: ["https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"],
    category: "chinese",
    description: "Wok-tossed rice with tender chicken pieces, vegetables, and soy sauce. A Chinese favorite!",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Caesar Salad",
    price: "179",
    productImageUrl: ["https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500"],
    category: "salad",
    description: "Fresh romaine lettuce with parmesan cheese, croutons, and creamy Caesar dressing. Healthy and delicious!",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Chocolate Brownie",
    price: "129",
    productImageUrl: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"],
    category: "desserts",
    description: "Rich, fudgy chocolate brownie with a crispy top and gooey center. Served warm with vanilla ice cream.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Mango Smoothie",
    price: "99",
    productImageUrl: ["https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500"],
    category: "drinks",
    description: "Refreshing mango smoothie blended with fresh mangoes, milk, and a touch of honey. Perfect for hot days!",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Pepperoni Pizza",
    price: "349",
    productImageUrl: ["https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500"],
    category: "pizza",
    description: "Loaded with spicy pepperoni, mozzarella cheese, and tangy tomato sauce. A pizza lover's dream!",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Veg Burger",
    price: "149",
    productImageUrl: ["https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500"],
    category: "burger",
    description: "Crispy vegetable patty with fresh lettuce, onions, tomatoes, and mayo in a soft bun.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    title: "Chicken Biryani",
    price: "299",
    productImageUrl: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"],
    category: "biryani",
    description: "Fragrant basmati rice layered with tender chicken pieces and aromatic spices. Served with raita.",
    totalQuantity: "100",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
];

export const addSampleFoodData = async () => {
  try {
    const productRef = collection(fireDB, "products");
    
    for (const food of sampleFoodData) {
      await addDoc(productRef, food);
      console.log(`Added: ${food.title}`);
    }
    
    console.log("All sample food items added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding sample food data:", error);
    return false;
  }
};
