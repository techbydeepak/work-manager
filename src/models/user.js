import mongoose, { Schema } from "mongoose";




const userSchema = new Schema({

    name: String,
    email:{
        type: String,
        unique: true,
        required: [true, "email is required"],
        
       
    },
    password:{
        type:String,
        required: [true, "password is required"],
    },
    about: String,
    profileURL: String,
    // address:{
    //     street: String,
    //     city: String,
    //     country: String,
    //     pinCode: Number
    // }
})

export const User = mongoose.models.users || mongoose.model("users", userSchema)

