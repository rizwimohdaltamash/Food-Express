import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";

const ProductDetails = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product deleted successfully!", {
        style: { borderRadius: "8px", background: "#e8f5e9", color: "#2e7d32" },
        icon: <CheckCircle className="w-5 h-5" />,
      });
      getAllProductFunction();
    } catch (error) {
      toast.error("Error deleting product!", {
        style: { borderRadius: "8px", background: "#ffebee", color: "#c62828" },
        icon: <XCircle className="w-5 h-5" />,
      });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="py-5 flex lg:w-[40%] w-full justify-between items-center">
        <h1 className="text-2xl text-orange-600 font-extrabold">
          All Menu Items
        </h1>

        <Link to={"/addproduct"}>
          <button className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-lg text-white font-medium shadow-md">
            <FaPlus /> Add Item
          </button>
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center relative top-20">
          <Loader />
        </div>
      )}

      <div className="w-full overflow-x-auto mb-5 px-4">
        <table className="w-full text-left border border-collapse border-orange-400 text-orange-900 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-100">
              {[
                "S.No.",
                "Image",
                "Title",
                "Price",
                "Total Quantity",
                "Category",
                "Date",
                "Edit",
                "Remove",
              ].map((head, i) => (
                <th
                  key={i}
                  className="h-12 px-6 text-md border border-orange-300 text-orange-800 font-bold text-center"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {getAllProduct.map((item, index) => {
              const {
                id,
                title,
                price,
                category,
                date,
                productImageUrl,
                totalQuantity,
              } = item;
              return (
                <tr
                  key={index}
                  className="border-b border-orange-200 hover:bg-orange-50 transition duration-300"
                >
                  <td className="h-12 px-6 text-center">{index + 1}.</td>
                  <td className="h-12 px-6 text-center">
                    <div className="flex justify-center">
                      <img
                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                        src={productImageUrl}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="h-12 px-6 text-center font-semibold capitalize">
                    {title}
                  </td>
                  <td className="h-12 px-6 text-center font-semibold">
                    ₹{price}
                  </td>
                  <td className="h-12 px-6 text-center">{totalQuantity}</td>
                  <td className="h-12 px-6 text-center capitalize">
                    {category}
                  </td>
                  <td className="h-12 px-6 text-center">{date}</td>

                  <td className="h-12 px-6 text-center">
                    <button
                      onClick={() => navigate(`/updateproduct/${id}`)}
                      className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-sm"
                    >
                      <FaEdit /> Update
                    </button>
                  </td>

                  <td className="h-12 px-6 text-center">
                    <button
                      onClick={() => deleteProduct(id)}
                      className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-sm"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
