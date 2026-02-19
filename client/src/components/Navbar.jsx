import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { ShopContext } from "../context/ShopContext";

import logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.png";
import profile_icon from "../assets/profile_icon.png";
import cart_icon from "../assets/cart_icon.png";
import menu_icon from "../assets/menu_icon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowSearch, user, logout, cartItems, wishlist } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `font-medium hover:text-black transition-colors ${
      isActive ? "text-black" : "text-gray-600"
    }`;

  const handleMobileNavClick = () => {
    setMenuOpen(false);
  };
const getCartCount = () => {
  let total = 0;

  for (const item in cartItems) {
    total += cartItems[item];
  }

  return total;
};

const getWishlistCount = () => {
  return wishlist ? wishlist.length : 0;
};

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      {/* MAIN NAVBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* LEFT — Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} className="w-32 md:w-36" alt="Forever Logo" />
          </Link>

          {/* CENTER — Desktop Menu (Only visible on md and above) */}
          <ul className="hidden md:flex items-center gap-8 text-sm flex-1 justify-center">
            <li>
              <NavLink to="/" className={navLinkStyle}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/collection" className={navLinkStyle}>
                COLLECTION
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkStyle}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkStyle}>
                CONTACT
              </NavLink>
            </li>
          </ul>

          {/* RIGHT — Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Search */}
            <button
              aria-label="Search"
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={search_icon} className="w-5" alt="Search" />
            </button>

            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button
                aria-label="Profile"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img src={profile_icon} className="w-5" alt="Profile" />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 text-sm z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b bg-gray-50">
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                        {user.role === "admin" && (
                          <span className="inline-block mt-1 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                            ADMIN
                          </span>
                        )}
                      </div>

                      {/* ADMIN DASHBOARD - Only for admins */}
                      {user.role === "admin" && (
                        <>
                          <div className="border-t my-1"></div>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-red-50 transition-colors text-red-600 font-semibold"
                          >
                            📊 Admin Dashboard
                          </Link>
                          <Link
                            to="/admin/products"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                          >
                            📦 Manage Products
                          </Link>
                          <Link
                            to="/admin/orders"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                          >
                            🛒 Manage Orders
                          </Link>
                          <Link
                            to="/admin/users"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                          >
                            👥 Manage Users
                          </Link>
                          <div className="border-t my-1"></div>
                        </>
                      )}

                      {user.role !== "admin" && (
                        <>
                          <Link
                            to="/myProfile"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          >
                            My Wishlist ({getWishlistCount()})
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          >
                            Orders
                          </Link>
                        </>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                          navigate("/myProfile");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors border-t text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      Login
                    </Link>

                   
                  )}
                </div>
              )}
            </div>

            {/* CART */}
            <Link to="/cart" className="relative">

  <img src={cart_icon} className="w-6" alt="Cart" />

  {getCartCount() > 0 && (
    <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-[2px] rounded-full">
      {getCartCount()}
    </span>
  )}

</Link>

            {/* WISHLIST */}
            <Link to="/wishlist" className="relative">
              <span className="text-2xl">♡</span>
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-full font-bold">
                  {getWishlistCount()}
                </span>
              )}
            </Link>


            {/* MOBILE MENU BUTTON - Only visible on mobile */}
            <button
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={menu_icon} className="w-6" alt="Menu" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Sidebar overlay (Only on mobile) */}
      {menuOpen && (
        <>
          {/* Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Slide-in Menu */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg">
            
            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <ul className="flex flex-col py-4">
              <li>
                <NavLink
                  to="/"
                  onClick={handleMobileNavClick}
                  className={({ isActive }) =>
                    `block px-6 py-3 font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collection"
                  onClick={handleMobileNavClick}
                  className={({ isActive }) =>
                    `block px-6 py-3 font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`
                  }
                >
                  COLLECTION
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  onClick={handleMobileNavClick}
                  className={({ isActive }) =>
                    `block px-6 py-3 font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`
                  }
                >
                  WISHLIST ({getWishlistCount()})
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={handleMobileNavClick}
                  className={({ isActive }) =>
                    `block px-6 py-3 font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`
                  }
                >
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={handleMobileNavClick}
                  className={({ isActive }) =>
                    `block px-6 py-3 font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`
                  }
                >
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;