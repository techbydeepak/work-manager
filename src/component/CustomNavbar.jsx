"use client";

import UserContext from "@/app/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

function CustomNavbar() {
  const context = useContext(UserContext);
  const router = useRouter();

  async function handleLogout() {
    try {
      const result = await logout();
      console.log(result);
      toast.success("Logout Successful");
      context.setUser(undefined);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout error");
    }
  }

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 h-16 py-4 px-6 flex justify-between items-center shadow-xl border-b-4 border-indigo-800">
      <div className="brand flex-1 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wider uppercase hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
          <Link href="/">Work Manager</Link>
        </h1>
      </div>

      <div className="flex-1 text-center">
        <ul className="flex justify-center space-x-8 text-lg font-semibold text-white">
          {context.user ? (
            <>
              <li>
                <Link href="/" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/add-task" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
                  Add Task
                </Link>
              </li>
              <li>
                <Link href="/show-task" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
                  Show Tasks
                </Link>
              </li>
              <li>
                <Link href="#!" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
                  {context.user.name}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default CustomNavbar;
