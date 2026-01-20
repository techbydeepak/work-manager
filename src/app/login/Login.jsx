"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "@/services/userService";
import UserContext from "../context/userContext";

export default function Login() {
  const router = useRouter();
  const context = useContext(UserContext);

  const [isHydrated, setIsHydrated] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });

        const result = await res.json();
        if (result.success) {
          context.setUser(result.user);
          console.log("✅ User already logged in:", result.user);
        }
      } catch (error) {
        console.error("User check failed", error);
      }
    }

    checkUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(data);
      toast.success("Logged in successfully! 🚀", { position: "top-center" });
      context.setUser(result.user);
      router.push("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(message, { position: "top-center" });
    }
  };

  const handleReset = () => {
    setData({ email: "", password: "" });
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200/10">
        <h2 className="text-4xl font-bold text-center text-white bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5 text-white">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-2 rounded-xl transition-all duration-300 font-semibold shadow-md hover:scale-105"
            >
              🔐 Login
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition-all duration-300 font-semibold shadow-md hover:scale-105"
            >
              🗑️ Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 👇 Reusable Input Component
const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm mb-1 ps-1 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-300/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300"
    />
  </div>
);
