"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/userService";

export default function Signup() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "https://iconduck.com/icons/6491/profile-default?shared",
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (data.name.trim() === "") {
      toast.warning("Name is required !!", { position: "top-center" });
      return;
    }
    try {
      const result = await signUp(data);
      toast.success("User registered successfully 🎉", {
        position: "top-center",
      });
      router.push("/login");
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: "https://iconduck.com/icons/6491/profile-default?shared",
      });
    } catch (error) {
      console.error(error);
      toast.error("Registration failed 😓", { position: "top-center" });
    }
  };

  const handleReset = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      profileURL: "https://iconduck.com/icons/6491/profile-default?shared",
    });
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200/10">
        <h2 className="text-4xl font-bold text-center text-white bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5 text-white">
          <InputField
            label="Username"
            type="text"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
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
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <TextareaField
            label="About"
            placeholder="Tell us about yourself"
            value={data.about}
            onChange={(e) => setData({ ...data, about: e.target.value })}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-2 rounded-xl transition-all duration-300 font-semibold shadow-md hover:scale-105"
            >
              ➕ Sign Up
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

// 👇 Reusable Textarea Component
const TextareaField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm mb-1 ps-1 font-medium">{label}</label>
    <textarea
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-300/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300"
    ></textarea>
  </div>
);
