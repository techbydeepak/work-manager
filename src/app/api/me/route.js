import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";

export async function GET(request) {
  try {

    await connectDb();

    const token = request.cookies.get("authToken")?.value;

    console.log("TOKEN:", token);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No token found",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    console.log("DECODED:", decoded);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {

      const response = NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 401,
        }
      );

      response.cookies.set("authToken", "", {
        maxAge: 0,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (err) {

    console.log("JWT ERROR:", err.message);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 401,
      }
    );
  }
}