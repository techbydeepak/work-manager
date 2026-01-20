import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email: email });

    if (user == null) {
      throw new Error("user not found");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error("password is incorrect");
    }

    if (!process.env.JWT_KEY) {
      throw new Error("JWT key is missing in environment");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY
    );

    const response = NextResponse.json({
      message: "Login Success",
      success: true,
      user: user,
    });

    const isProduction = process.env.NODE_ENV === "production"; // ✅ THIS WAS MISSING

    response.cookies.set("authToken", token, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    console.log(user);
    console.log(token);

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
