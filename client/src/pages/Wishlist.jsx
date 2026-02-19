import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const navigate = useNavigate();
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    currency,
    token,
  } = useContext(ShopContext);

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

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Please login to view wishlist</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-800"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-3">
        <span className="text-gray-500">MY </span>
        <span className="text-gray-700">WISHLIST</span>
      </div>

      {wishlist && wishlist.length > 0 ? (
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="flex gap-6 border-b pb-6 items-start"
              >
                {/* Product Image */}
                <div className="w-24 h-32 flex-shrink-0 overflow-hidden bg-gray-100 rounded">
                  {item.image && item.image.length > 0 ? (
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="font-semibold text-lg cursor-pointer hover:underline"
                        onClick={() => handleViewProduct(item._id)}
                      >
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.category}
                      </p>
                      <p className="text-lg font-bold mt-2">
                        {currency}{item.price}
                      </p>
                    </div>
                    <span
                      className="text-2xl cursor-pointer hover:scale-110"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      title="Remove from wishlist"
                    >
                      ❤️
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className="flex-1 bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800 transition"
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={() => handleViewProduct(item._id)}
                      className="flex-1 border border-gray-300 py-2 px-4 rounded text-sm hover:bg-gray-100 transition"
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="flex justify-end gap-10 mt-8 border-t pt-8 mb-20">
            <button
              onClick={() => navigate("/collection")}
              className="text-lg font-semibold px-8 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold mb-4">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-8">
            Add items to your wishlist to save them for later
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-800"
          >
            START SHOPPING
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
