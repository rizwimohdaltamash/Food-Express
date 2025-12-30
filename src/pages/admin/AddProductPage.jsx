import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { toast } from "react-hot-toast";

const categoryList = [
  { name: "pizza" },
  { name: "burger" },
  { name: "breakfast" },
  { name: "salad" },
  { name: "chinese" },
  { name: "drinks" },
  { name: "desserts" },
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: [],
    category: "",
    description: "",
    totalQuantity: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = async () => {
    try {
      if (!imageFile) {
        toast.error("Please select an image.");
        return [];
      }
      const storageRef = ref(storage, `product-images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      return [url];
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image.");
      return [];
    }
  };

  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.category === "" ||
      product.description === "" ||
      product.totalQuantity === ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const imageUrls = await handleImageUpload();
      if (imageUrls.length === 0) {
        setLoading(false);
        return;
      }

      const productRef = collection(fireDB, "products");
      await addDoc(productRef, { ...product, productImageUrl: imageUrls });
      toast.success("Product added successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {loading && <Loader />}
      <div className="bg-white shadow-lg border-2 border-orange-300 px-8 py-6 rounded-2xl w-[90%] md:w-[60%] lg:w-[35%]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-orange-600 mb-1">
            Add New Menu Item
          </h2>
          <p className="text-gray-500 text-sm">
            Enter details below to add your dish.
          </p>
        </div>

        {/* Product Title */}
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Dish Name"
            className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
          />
        </div>

        {/* Product Price */}
        <div className="mb-3">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Price"
            className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <textarea
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Description"
            className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
          />
        </div>

        {/* Total Quantity */}
        <div className="mb-3">
          <input
            type="number"
            name="totalQuantity"
            value={product.totalQuantity}
            onChange={(e) =>
              setProduct({ ...product, totalQuantity: e.target.value })
            }
            placeholder="Available Quantity"
            className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="bg-orange-50 border-2 border-orange-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full px-3 py-2 bg-orange-50 border-2 border-orange-200 text-gray-800 rounded-md outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          >
            <option value="">Select Category</option>
            {categoryList.map((value, index) => (
              <option key={index} value={value.name} className="capitalize">
                {value.name}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div className="mt-5">
          <button
            onClick={addProductFunction}
            type="button"
            className="bg-orange-500 hover:bg-orange-600 transition-all w-full text-white font-bold py-2 rounded-lg shadow-md"
          >
            + Add Menu Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
