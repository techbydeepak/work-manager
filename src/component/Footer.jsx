"use client";

import React from "react";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mt-10 text-white">
      <div className="max-w-6xl mx-auto py-10 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Welcome Section */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-3 tracking-wider">Welcome to Work Manager</h1>
            <p className="text-lg opacity-80">
              Simplify your work with ease. Manage tasks, track progress, and stay organized with our easy-to-use platform.
            </p>
          </div>

          {/* Important Links */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold mb-3">Important Links</h2>
            <ul className="space-y-2 text-lg">
              <li>
                <a href="https://www.facebook.com" className="hover:text-gray-200 transition-all duration-300">
                  <FaFacebook className="inline mr-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com" className="hover:text-gray-200 transition-all duration-300">
                  <FaYoutube className="inline mr-2" /> Youtube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" className="hover:text-gray-200 transition-all duration-300">
                  <FaInstagram className="inline mr-2" /> Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Copyright */}
          <div className="text-center sm:text-right">
            <p className="text-lg font-light opacity-75">
              © 2025 Work Manager. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
