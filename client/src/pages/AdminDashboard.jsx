import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import { toast } from "react-toastify";
import AdminAddProduct from "../components/AdminAddProducts";
import { FiTrash2, FiEdit2, FiImage, FiArrowUp, FiArrowDown } from "react-icons/fi";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/product/list`);
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================================
  // DELETE PRODUCT
  // ================================
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.post(
        `${API_URL}/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  // ================================
  // SORT PRODUCTS
  // ================================
  const getSortedProducts = () => {
    let sorted = [...products];
    
    sorted.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "price") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage and organize all your products</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "list"
              ? "border-black text-black"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Product List ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "add"
              ? "border-black text-black"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Add New Product
        </button>
      </div>

      {/* PRODUCTS LIST TAB */}
      {activeTab === "list" && (
        <div>
          {/* SORTING CONTROLS */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="category">Category</option>
              </select>
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              {sortOrder === "asc" ? <FiArrowUp size={18} /> : <FiArrowDown size={18} />}
              <span className="text-sm font-medium">
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </span>
            </button>
          </div>

          {/* PRODUCTS */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FiImage className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No products found</p>
              <p className="text-gray-500 text-sm mt-2">Add your first product to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getSortedProducts().map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* IMAGE */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {product.image?.[0] ? (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-4xl text-gray-400" />
                      </div>
                    )}

                    {/* BADGES */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {product.bestseller && (
                        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {product.category} • {product.subCategory}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{parseFloat(product.price).toLocaleString()}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors font-medium"
                      >
                        <FiTrash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD PRODUCT TAB */}
      {activeTab === "add" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <AdminAddProduct />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
