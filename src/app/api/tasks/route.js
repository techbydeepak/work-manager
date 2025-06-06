import { NextResponse } from "next/server";
import {Task} from "../../../models/task"
import { getResponseMessage } from "@/helper/responseMessage";
import { connectDb } from "@/helper/db";
import jwt from "jsonwebtoken";

// get all the tasks 

await connectDb()
export async function GET(request){

    try {
      const tasks = await Task.find()
      return NextResponse.json(tasks)
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in getting data !!", 404, false);
        
    }
}

// create al the tasks
export async function POST(request){
    const {title, content, status, userId} = await request.json();

    // fetching login userid 
    const authToken = request.cookies.get("authToken")?.value
    //    console.log(authToken);
    
       const data = jwt.verify(authToken, process.env.JWT_KEY);
    //    console.log(data);
    try {
        const task = new Task({
            title,
            content,
            status,
            userId:data._id,
            
        })

       const  createdTask = await task.save()

       return NextResponse.json(createdTask,{

        status: 201,
       })
    } catch (error) {
        console.log(error);
        
       return getResponseMessage("failed to create a task", 404, false)
    }

}

// 