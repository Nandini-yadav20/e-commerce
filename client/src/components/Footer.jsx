import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <img src={logo} alt="Logo" className="w-36 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Premium fashion designed for comfort, style, and everyday
            confidence. We bring high-quality clothing with exceptional
            customer service.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Careers</li>
            <li className="hover:text-black cursor-pointer">Blog</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Shipping Policy</li>
            <li className="hover:text-black cursor-pointer">Return Policy</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            <li className="hover:text-black cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Huzurganj, Madhya Pradesh</li>
            <li>+91 98765 43210</li>
            <li>support@yourstore.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Store. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
