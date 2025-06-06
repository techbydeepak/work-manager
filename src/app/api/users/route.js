import { connectDb } from "@/helper/db";
import { User } from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDb();
export async function GET(request) {
  let users = [];
  try {
    users = await User.find().select("-password");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to get users ",
      success: "false",
    });
  }
  return NextResponse.json(users);
}
export async function POST(request) {
  // fetch user details from request

  const { name, email, password, about, profileURL } = await request.json();

  // create user object with user model

  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });

  try {
    // save
    // object to the database

    user.password = await bcrypt.hash(
      user.password,
      parseInt( process.env.BCRYPT_SALT));
    console.log(user);

    const createUser = await user.save();

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "failed to createUser !!",
        status: false,
      },
      {
        status: 500,
      }
    );
  }
  // // const body = request.body;
  // // console.log(body);
  // // // console.log(request.method);
  // // // console.log(request.message);
  // // // console.log(request.cookies);
  // // // console.log(request.header);
  // // console.log(request.nextUrl.pathName)
  // //
  // // const jsonData = await request.json();
  // // console.log(jsonData);
  // const jsonData = await request.text();
  // console.log(jsonData);

  // return NextResponse.json({
  //     message: "data saved successfully",
  // })
}

export function DELETE(request) {
  console.log("delete api called");
  return NextResponse.json(
    {
      message: "delete api called",
      status: true,
    },
    { status: 201, statusText: "massage has appear" }
  );
}

export function PUT() {}
