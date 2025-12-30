import { useNavigate } from "react-router";
import { UtensilsCrossed } from "lucide-react";

// Food Category Data
const category = [
  { image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400", name: "pizza" },
  { image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", name: "burger" },
  { image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", name: "breakfast" },
  { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", name: "salad" },
  { image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400", name: "chinese" },
  { image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400", name: "drinks" },
  { image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400", name: "desserts" },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 px-4">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-orange-600 mb-6 flex items-center justify-center gap-2">
        What's on your <span className="text-red-500">mind?</span> <UtensilsCrossed className="w-7 h-7" />
      </h2>

      {/* Scrollable Categories */}
      <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar px-2">
        <div className="flex gap-6 lg:gap-12 pb-4">
          {category.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Category Image */}
              <div
                onClick={() => navigate(`/category/${item.name}`)}
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-lg border-4 border-orange-200 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-orange-400/50 bg-white cursor-pointer flex justify-center items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Name */}
              <h1 className="mt-2 text-sm lg:text-lg text-center font-semibold text-gray-800 first-letter:uppercase tracking-wide">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hide-scroll-bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scroll-bar::-webkit-scrollbar {
            display: none;
          }
        `,
        }}
      />
    </div>
  );
};

export default Category;


