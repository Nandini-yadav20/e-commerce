import React, { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import SearchBar from "../components/SearchBar";

const Collection = () => {
  <SearchBar/>
  const { products, search, showSearch } = useContext(ShopContext);
  const[showFilter,setShowFilter] = useState(false);

  const[filterProducts, setFilterProducts]= useState([])

  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState(50000); // Max price filter

  // 🔹 Filter + Sort (optimized)
  const filteredProducts = useMemo(() => {
    let items = [...products];

    // Apply search filter
    if (search) {
      items = items.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category !== "All") {
      items = items.filter((p) => p.category === category);
    }

    // Apply subcategory filter
    if (subCategory !== "All") {
      items = items.filter((p) => p.subCategory === subCategory);
    }

    // Apply price range filter
    items = items.filter((p) => p.price <= priceRange);

    // Apply sorting
    if (sortOption === "low-high") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [products, search, category, subCategory, sortOption, priceRange]);

  return (
    <div className="bg-white text-gray-900 min-h-screen">

      {/* PAGE HEADER */}
      <div className="text-center py-16 border-b">
        <h1 className="text-4xl font-light tracking-wide">
          COLLECTION
        </h1>
        <p className="text-gray-500 mt-2 text-sm tracking-widest">
          Discover our curated luxury selection
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">

        {/* ================= LEFT FILTER SIDEBAR ================= */}
        <aside className="lg:w-72">

          <h2 className="text-lg font-semibold mb-8 tracking-wide">
            FILTERS
          </h2>

          {/* CATEGORY */}
          <div className="mb-8">
            <p className="uppercase text-sm text-gray-500 mb-3">
              Category
            </p>

            <div className="space-y-2">
              {["All", "Men", "Women", "Kids"].map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`block text-left w-full transition ${
                    category === item
                      ? "text-black font-medium"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* SUB CATEGORY */}
          <div className="mb-8">
            <p className="uppercase text-sm text-gray-500 mb-3">
              Subcategory
            </p>

            <div className="space-y-2">
              {["All", "Topwear", "Bottomwear", "Winterwear"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSubCategory(item)}
                  className={`block text-left w-full transition ${
                    subCategory === item
                      ? "text-black font-medium"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE RANGE */}
          <div className="mb-8">
            <p className="uppercase text-sm text-gray-500 mb-3">
              Price
            </p>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="50000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-600">
                Up to ₹{priceRange.toLocaleString()}
              </p>
            </div>
          </div>

          {/* RESET FILTERS */}
          <div className="pt-8 border-t">
            <button
              onClick={() => {
                setCategory("All");
                setSubCategory("All");
                setSortOption("");
                setPriceRange(50000);
              }}
              className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* ================= RIGHT CONTENT ================= */}
        <section className="flex-1">

          {/* TOP BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">

            <p className="text-gray-500 text-sm">
              {filteredProducts.length} Products
            </p>

            {/* SORT */}
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 px-4 py-2 text-sm rounded-md focus:outline-none"
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">

            {filteredProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="group cursor-pointer"
              >
                {/* IMAGE */}
                <div className="overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* INFO */}
                <div className="mt-4 space-y-1">

                  <h3 className="text-sm tracking-wide">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    ₹{item.price}
                  </p>

                </div>
              </Link>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              No products found
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Collection;
 