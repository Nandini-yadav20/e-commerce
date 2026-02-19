import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import { toast } from "react-toastify";
import {
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch products count
      const productsRes = await axios.get(`${API_URL}/product/list`);
      const totalProducts = productsRes.data.products?.length || 0;

      // Fetch orders count
      const ordersRes = await axios.get(`${API_URL}/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orders = ordersRes.data.orders || [];
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

      // Fetch users count
      const usersRes = await axios.get(`${API_URL}/user/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const totalUsers = usersRes.data.users?.length || 0;

      // Sort orders by date (most recent first) and take 5
      const recentOrdersList = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
      });

      setRecentOrders(recentOrdersList);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl" style={{ color }}>
          <Icon />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your store overview.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiPackage}
          title="Total Products"
          value={stats.totalProducts}
          color="#3B82F6"
        />
        <StatCard
          icon={FiShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          color="#10B981"
        />
        <StatCard
          icon={FiUsers}
          title="Total Users"
          value={stats.totalUsers}
          color="#F59E0B"
        />
        <StatCard
          icon={FiTrendingUp}
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          color="#EF4444"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <FiPackage className="text-3xl mb-3" />
          <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
          <p className="text-blue-100 text-sm mb-4">Add, edit, or delete products</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">View Details</span>
            <FiArrowRight />
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <FiShoppingCart className="text-3xl mb-3" />
          <h3 className="text-lg font-semibold mb-2">View Orders</h3>
          <p className="text-green-100 text-sm mb-4">Track and manage all orders</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">View Details</span>
            <FiArrowRight />
          </div>
        </Link>

        <Link
          to="/admin/users"
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <FiUsers className="text-3xl mb-3" />
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-purple-100 text-sm mb-4">View and manage customer accounts</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">View Details</span>
            <FiArrowRight />
          </div>
        </Link>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                      #{order._id?.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900 font-semibold">
                      ₹{order.amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
