// src/app/api/me/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";

export async function GET(request) {
  try {
    const token = request.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "No token" }, { status: 401 });
    }

    await connectDb();
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      const response = NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
      response.cookies.set("authToken", "", { maxAge: 0 });
      return response;
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.log("Error in /api/me:", err.message);
    const response = NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    response.cookies.set("authToken", "", { maxAge: 0 });
    return response;
  }
}
