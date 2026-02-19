import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {

  const { id } = useParams();

  const { products, addToCart, currency, API_URL, token, wishlist, addToWishlist, removeFromWishlist } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // First try to find in local products
    const product = products.find((item) => item._id === id);

    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
    } else {
      // Fetch from backend if not found locally
      fetchProduct();
    }
  }, [id, products]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/single/${id}`);
      if (response.data.success) {
        setProductData(response.data.product);
        setImage(Array.isArray(response.data.product.image) ? response.data.product.image[0] : response.data.product.image);
      }
    } catch (error) {
      toast.error("Product not found");
      console.error("Error fetching product:", error);
    }
  };

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    addToCart(id, quantity);
    toast.success("Added to cart!");
  };

  const handleWishlistToggle = () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(id);
      toast.success("Removed from wishlist!");
    } else {
      addToWishlist(id);
      toast.success("Added to wishlist!");
    }
  };

  const isWishlisted = wishlist && wishlist.some((item) => item._id === id);

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="border-t pt-10">

      <div className="flex gap-12 flex-col sm:flex-row">

        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-3">
          {productData.image.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setImage(img)}
              className="w-20 cursor-pointer border"
              alt=""
            />
          ))}
        </div>

        {/* Main Image */}
        <div>
          <img src={image} className="w-96" alt="" />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold">
            {productData.name}
          </h1>

          <p className="mt-4 text-gray-600">
            {productData.description}
          </p>

          <p className="mt-4 text-xl font-semibold">
            {currency}{productData.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-6">
            <label className="text-gray-600">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-8 py-3 bg-black text-white hover:bg-gray-800 transition"
            >
              ADD TO CART
            </button>
            <button
              onClick={handleWishlistToggle}
              className="px-8 py-3 border border-gray-300 hover:bg-gray-100 transition text-2xl"
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Product;
