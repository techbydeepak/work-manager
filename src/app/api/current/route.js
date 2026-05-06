import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";

export async function GET(request) {

  try {

    const authToken = request.cookies.get("authToken")?.value;

    console.log(authToken);

    // IMPORTANT FIX
    if (!authToken) {
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

    await connectDb();

    const data = jwt.verify(authToken, process.env.JWT_KEY);

    console.log(data);

    const user = await User.findById(data._id).select("-password");

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
}