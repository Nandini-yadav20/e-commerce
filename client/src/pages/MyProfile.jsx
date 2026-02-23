
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Profile = () => {
  const { currency, wishlist, removeFromWishlist, addToCart, token, isContextReady } = useContext(ShopContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for context to be ready and token to be available
    if (!isContextReady) {
      return;
    }

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const authToken = token || localStorage.getItem("token");
        
        if (!authToken) {
          navigate("/login");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        const profileRes = await axios.get(
          "http://localhost:5000/api/user/profile",
          config
        );
        const ordersRes = await axios.get(
          "http://localhost:5000/api/order/user-order",
          config
        );

        if (profileRes.data.success) {
          setUser(profileRes.data.user);
        }

        if (ordersRes.data.success) {
          setOrders(ordersRes.data.orders);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        toast.error("Failed to load profile data");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, isContextReady, navigate]);

  if (!isContextReady || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load profile data.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  // Handlers for wishlist actions
  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    toast.success("Added to cart");
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
      {/* PROFILE HEADER */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div className="text-center md:text-left">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 mt-8 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 font-medium whitespace-nowrap ${
            activeTab === "profile"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 font-medium whitespace-nowrap ${
            activeTab === "orders"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`pb-3 font-medium whitespace-nowrap ${
            activeTab === "wishlist"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Wishlist
        </button>
      </div>

      {/* PROFILE DETAILS */}
      {activeTab === "profile" && (
        <div className="mt-8">
          <div className="bg-white shadow rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Account Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-900 font-medium mt-1">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900 font-medium mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-900 font-medium mt-1">{user.phone || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Street Address</label>
                    <p className="text-gray-900 font-medium mt-1">{user.address || "Not provided"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">City</label>
                      <p className="text-gray-900 font-medium mt-1">{user.city || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">State</label>
                      <p className="text-gray-900 font-medium mt-1">{user.state || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">ZIP Code</label>
                      <p className="text-gray-900 font-medium mt-1">{user.zipCode || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Country</label>
                      <p className="text-gray-900 font-medium mt-1">{user.country || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Account Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-gray-900 font-medium mt-1">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Role</label>
                  <p className="text-gray-900 font-medium mt-1 capitalize">
                    {user.role || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS */}
      {activeTab === "orders" && (
        <div className="mt-8 space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white shadow rounded-xl p-6">
                <div className="flex justify-between flex-wrap gap-2 mb-4">
                  <div>
                    <p className="font-semibold">
                      Order ID: {order._id}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {currency}
                      {order.amount}
                    </p>

                    <span
                      className={`text-sm font-medium ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          className="w-16 h-16 object-cover rounded"
                          alt=""
                        />

                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500 text-sm">
                            {currency}
                            {item.price}
                          </p>
                        </div>
                      </div>

                      <button className="px-4 py-2 border rounded hover:bg-gray-100">
                        Buy Again
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* WISHLIST */}
      {activeTab === "wishlist" && (
        <div className="mt-8 space-y-6">
          {!wishlist || wishlist.length === 0 ? (
            <p className="text-gray-500">No wishlist items found.</p>
          ) : (
            wishlist.map((item, idx) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center gap-6"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex-shrink-0 cursor-pointer" onClick={() => handleViewProduct(item._id)}>
                  {item.image && (Array.isArray(item.image) ? item.image.length > 0 : item.image) ? (
                    <img
                      src={Array.isArray(item.image) ? item.image[0] : item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-100 text-xs text-gray-400 rounded">No image</div>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xs uppercase text-gray-400 mb-1">{item.category}</p>
                  <h3 className="text-lg font-medium cursor-pointer" onClick={() => handleViewProduct(item._id)}>{item.name}</h3>
                  <p className="text-gray-700 mb-2">{currency}{item.price?.toLocaleString("en-IN")}</p>
                  <div className="flex gap-2 justify-center md:justify-start">
                    <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-xs" onClick={() => handleAddToCart(item._id)}>
                      Add to Cart
                    </button>
                    <button className="px-4 py-2 border rounded text-xs" onClick={() => handleViewProduct(item._id)}>
                      View Details
                    </button>
                  </div>
                </div>
                <button
                  className="ml-4 text-red-400 hover:text-red-600 text-2xl"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  title="Remove from wishlist"
                >
                  ♥
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;