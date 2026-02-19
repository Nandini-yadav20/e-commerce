import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiSearch } from "react-icons/fi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/user/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredUsers = () => {
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">View and manage all customer accounts</p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>

      {/* USERS TABLE */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No users found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              {/* USER HEADER */}
              <div
                onClick={() =>
                  setExpandedUser(expandedUser === user._id ? null : user._id)
                }
                className="p-4 md:p-6 hover:bg-gray-50 transition-colors border-b"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">NAME</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium">EMAIL</p>
                    <p className="text-sm text-gray-900 mt-1 truncate">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium">JOINED</p>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium">STATUS</p>
                    <div className="mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Customer"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {expandedUser === user._id && (
                <div className="p-4 md:p-6 bg-gray-50 border-t space-y-6">
                  {/* PERSONAL INFO */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-xs text-gray-600 font-medium">Full Name</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{user.name}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FiMail className="text-gray-400" size={14} />
                          <p className="text-xs text-gray-600 font-medium">Email Address</p>
                        </div>
                        <p className="text-sm text-gray-900 mt-1">{user.email}</p>
                      </div>

                      {user.phone && (
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <FiPhone className="text-gray-400" size={14} />
                            <p className="text-xs text-gray-600 font-medium">Phone</p>
                          </div>
                          <p className="text-sm text-gray-900 mt-1">{user.phone}</p>
                        </div>
                      )}

                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-xs text-gray-600 font-medium">Member Since</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ADDRESS INFO */}
                  {(user.street || user.city) && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Address Information</h4>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <FiMapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                          <div className="text-sm text-gray-900">
                            {user.street && <p>{user.street}</p>}
                            {user.city && (
                              <p>
                                {user.city}, {user.state} {user.zipcode}
                              </p>
                            )}
                            {user.country && <p>{user.country}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACCOUNT INFO */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Account Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-xs text-gray-600 font-medium">Role</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1 capitalize">
                          {user.role || "Customer"}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-xs text-gray-600 font-medium">Account Status</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1 text-green-600">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Admin Accounts</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Customer Accounts</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {users.filter((u) => u.role === "customer" || !u.role).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
