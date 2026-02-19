import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import { toast } from "react-toastify";
import { FiFilter, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/order/update`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const getFilteredOrders = () => {
    if (filterStatus === "all") return orders;
    return orders.filter((order) => order.status === filterStatus);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FiCheckCircle className="text-green-600 text-xl" />;
      case "Processing":
        return <FiClock className="text-blue-600 text-xl" />;
      case "Cancelled":
        return <FiXCircle className="text-red-600 text-xl" />;
      default:
        return <FiClock className="text-yellow-600 text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  const filteredOrders = getFilteredOrders();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-wrap items-center gap-3">
        <FiFilter className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        {["all", "Pending", "Processing", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterStatus === status
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* ORDERS LIST */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* ORDER HEADER */}
              <div
                onClick={() =>
                  setExpandedOrder(expandedOrder === order._id ? null : order._id)
                }
                className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Order ID</p>
                    <p className="text-sm font-bold text-gray-900">
                      #{order._id?.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium">Customer</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{order.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium">Amount</p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{order.amount?.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium">Date</p>
                    <p className="text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {expandedOrder === order._id && (
                <div className="p-4 md:p-6 bg-gray-50 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* DELIVERY ADDRESS */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Delivery Address</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>{order.firstName} {order.lastName}</p>
                        <p>{order.street}</p>
                        <p>{order.city}, {order.state} {order.zipcode}</p>
                        <p>{order.country}</p>
                        <p className="mt-2">
                          <span className="font-medium">Phone:</span> {order.phone}
                        </p>
                      </div>
                    </div>

                    {/* ORDER DETAILS */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Order Details</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">Subtotal:</span> ₹
                          {(order.amount || 0).toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">Tax:</span> ₹
                          {((order.amount * 0.18) || 0).toFixed(2)}
                        </p>
                        <p>
                          <span className="font-medium">Shipping:</span> ₹10
                        </p>
                        <p className="font-bold border-t pt-2 mt-2">
                          Total: ₹{(order.amount + 10 + (order.amount * 0.18)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Items</h4>
                    <div className="bg-white rounded border">
                      {order.items && order.items.length > 0 ? (
                        <ul className="divide-y">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="p-3 flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span className="text-gray-600">
                                {item.quantity} x ₹{item.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="p-3 text-gray-600">No items details available</p>
                      )}
                    </div>
                  </div>

                  {/* STATUS UPDATE */}
                  <div className="mt-6 pt-6 border-t">
                    <p className="font-bold text-gray-900 mb-3">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {["Pending", "Processing", "Delivered", "Cancelled"].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order._id, status)}
                          disabled={order.status === status}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            order.status === status
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
