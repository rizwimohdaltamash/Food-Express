import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;

  // Predefined categories
  const categories = [
    { title: "shirt", image: "https://m.media-amazon.com/images/I/71jtkd3vr0L._AC_UL480_FMwebp_QL65_.jpg", path: "/category/shirt" },
    { title: "jacket", image: "https://m.media-amazon.com/images/I/51qp9ls9+iL._AC_UL480_FMwebp_QL65_.jpg", path: "/category/jacket" },
    { title: "mobile", image: "https://m.media-amazon.com/images/I/71C8O0yT7hL._AC_UY327_FMwebp_QL65_.jpg", path: "/category/mobile" },
    { title: "laptop", image: "https://m.media-amazon.com/images/I/513p8BwV-RL._SX679_.jpg", path: "/category/laptop" },
    { title: "shoes", image: "https://m.media-amazon.com/images/I/71cflgAolqL._SY695_.jpg", path: "/category/shoes" },
    { title: "home", image: "https://m.media-amazon.com/images/I/41aafWU+WrL._SY300_SX300_.jpg", path: "/category/home" },
    { title: "books", image: "https://m.media-amazon.com/images/I/71DVDgwLPRL._AC_UY327_FMwebp_QL65_.jpg", path: "/category/books" },
  ];

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Filtered data
  const filteredProducts = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Search Input */}
      <div className="relative flex items-center justify-center w-[95%] lg:w-96">
        <IoSearch
          size={22}
          className="absolute left-3 text-emerald-800 opacity-80"
        />
        <input
          type="text"
          placeholder="Search for products, brands, and more..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="bg-emerald-50 border border-emerald-300 placeholder-emerald-600 focus:border-emerald-600 rounded-full px-10 py-2 w-full text-emerald-900 shadow-sm transition-all duration-300 outline-none focus:shadow-md focus:shadow-emerald-100"
        />
      </div>

      {/* Dropdown */}
      {search && (
        <div className="absolute top-12 bg-white shadow-lg rounded-lg w-[95%] lg:w-96 max-h-96 overflow-y-auto z-50 p-2 border border-emerald-200">
          {filteredCategories.length > 0 || filteredProducts.length > 0 ? (
            <>
              {/* Categories */}
              {filteredCategories.length > 0 && (
                <h3 className="px-3 py-1 text-sm font-semibold text-emerald-700">
                  Categories
                </h3>
              )}
              {filteredCategories.map((category, index) => (
                <div
                  key={`cat-${index}`}
                  onClick={() => {
                    navigate(category.path);
                    setSearch("");
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-emerald-50 cursor-pointer transition"
                >
                  <img
                    className="w-10 h-10 rounded-md object-cover border border-emerald-100"
                    src={category.image}
                    alt={category.title}
                  />
                  <span className="text-emerald-800 font-medium">
                    {category.title}
                  </span>
                </div>
              ))}

              {/* Products */}
              {filteredProducts.length > 0 && (
                <h3 className="px-3 py-1 text-sm font-semibold text-emerald-700 mt-2">
                  Products
                </h3>
              )}
              {filteredProducts.map((item, index) => (
                <div
                  key={`prod-${index}`}
                  onClick={() => {
                    navigate(`/productinfo/${item.id}`);
                    setSearch("");
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-emerald-50 cursor-pointer transition"
                >
                  <img
                    className="w-10 h-10 rounded-md object-cover border border-emerald-100"
                    src={item.productImageUrl}
                    alt={item.title}
                  />
                  <span className="text-emerald-900">{item.title}</span>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-5">
              <img
                className="w-16 opacity-80"
                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                alt="no results"
              />
              <p className="text-emerald-700 text-sm mt-2">
                No matches found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
