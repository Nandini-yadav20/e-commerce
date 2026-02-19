import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { currency } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");

  const token = localStorage.getItem("token");

  // ================= FETCH USER PROFILE =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchUser();
  }, []);

  // ================= FETCH USER ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/orders/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchOrders();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">

      {/* ================= PROFILE HEADER ================= */}
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

      {/* ================= TABS ================= */}
      <div className="flex gap-6 mt-8 border-b">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 font-medium ${
            activeTab === "orders"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Orders
        </button>
      </div>

      {/* ================= ORDERS ================= */}
      {activeTab === "orders" && (
        <div className="mt-8 space-y-6">

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded-xl p-6"
              >
                {/* Order Header */}
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

                {/* Items */}
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
    </div>
  );
};

export default Profile;
