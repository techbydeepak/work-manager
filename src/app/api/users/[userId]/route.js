import { NextResponse } from "next/server";
import {User} from "../../../../models/user"

export async function DELETE(request,{params}){
    
    const {userId} = params;
   
    try {
       await User.deleteOne({

            _id:userId
        })
    } catch (error) {
        return NextResponse.json({
            message: "error in delete testing",
            success: false
        })
    }
    
    return NextResponse.json({
        message: "testing delete",
        success: true
    })
}

export async function PUT(request, {params}){
    const {userId} = params

    const {name, password, about, profileURL}= await request.json()

    try {
       const user = await User.findById(userId)

       user.name = name;
       user.password = password;
       user.about = about;
       user.profileURL = profileURL;

       const updatedUser = await user.save()
       
       return NextResponse.json(updatedUser)
       
    } catch (error) {
        return NextResponse.json({
            message: "error in update testing",
            success: false
            
        })
    }
}


export async function GET(request,{params}){
    const {userId} = params


    const user= await User.findById(userId)
    return NextResponse.json(user)
}