import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

const sampleRestaurantsData = [
  {
    name: "The Golden Fork",
    cuisine: "Italian, European",
    address: "123 Main Street, Downtown, New York, NY 10001",
    phone: "+1 (212) 555-0123",
    email: "info@goldenfork.com",
    timing: "11:00 AM - 11:00 PM",
    rating: "4.8",
    description: "Experience authentic Italian cuisine in an elegant setting. Our chefs bring traditional recipes from Italy, crafted with the finest ingredients. Perfect for romantic dinners and special occasions.",
    tags: ["Italian", "Fine Dining", "Romantic", "Wine Bar", "Outdoor Seating"],
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    name: "Spice Route",
    cuisine: "Indian, Asian",
    address: "456 Park Avenue, Midtown, New York, NY 10022",
    phone: "+1 (212) 555-0456",
    email: "contact@spiceroute.com",
    timing: "12:00 PM - 10:30 PM",
    rating: "4.6",
    description: "Journey through India's diverse culinary landscape. From North Indian curries to South Indian delicacies, we offer an authentic taste of India with modern presentation.",
    tags: ["Indian", "Spicy", "Vegetarian Options", "Curry", "Family Friendly"],
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    name: "Sakura Sushi Bar",
    cuisine: "Japanese, Sushi",
    address: "789 Madison Avenue, Upper East Side, New York, NY 10065",
    phone: "+1 (212) 555-0789",
    email: "hello@sakurasushi.com",
    timing: "5:00 PM - 12:00 AM",
    rating: "4.9",
    description: "Premium sushi and Japanese cuisine crafted by master chefs. Fresh fish delivered daily, traditional techniques, and an extensive sake collection.",
    tags: ["Japanese", "Sushi", "Seafood", "Sake Bar", "Upscale"],
    imageUrl: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    name: "The Burger Joint",
    cuisine: "American, Burgers",
    address: "321 Broadway, SoHo, New York, NY 10012",
    phone: "+1 (212) 555-0321",
    email: "orders@burgerjoint.com",
    timing: "11:00 AM - 11:00 PM",
    rating: "4.5",
    description: "Gourmet burgers made with premium beef, creative toppings, and artisanal buns. Casual dining with a fun atmosphere, perfect for families and groups.",
    tags: ["American", "Burgers", "Casual", "Family Friendly", "Craft Beer"],
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    name: "Dragon Wok",
    cuisine: "Chinese, Asian Fusion",
    address: "654 Canal Street, Chinatown, New York, NY 10013",
    phone: "+1 (212) 555-0654",
    email: "info@dragonwok.com",
    timing: "10:00 AM - 10:00 PM",
    rating: "4.7",
    description: "Authentic Chinese cuisine with a modern twist. Our dim sum is legendary, and our Peking duck is a must-try. Experience the flavors of China in the heart of Chinatown.",
    tags: ["Chinese", "Dim Sum", "Noodles", "Affordable", "Takeout"],
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
  {
    name: "Green Leaf Cafe",
    cuisine: "Healthy, Vegan",
    address: "987 Bleecker Street, Greenwich Village, New York, NY 10014",
    phone: "+1 (212) 555-0987",
    email: "contact@greenleaf.com",
    timing: "8:00 AM - 9:00 PM",
    rating: "4.6",
    description: "Plant-based paradise offering nutritious and delicious vegan dishes. From smoothie bowls to hearty salads, every item is made with organic, locally-sourced ingredients.",
    tags: ["Vegan", "Healthy", "Organic", "Salads", "Smoothies"],
    imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  },
];

export const addSampleRestaurants = async () => {
  try {
    const restaurantRef = collection(fireDB, "restaurants");

    for (const restaurant of sampleRestaurantsData) {
      await addDoc(restaurantRef, restaurant);
      console.log(`Added: ${restaurant.name}`);
    }

    console.log("All sample restaurants added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding sample restaurants:", error);
    return false;
  }
};
