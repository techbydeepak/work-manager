// api/tasks/{taskId}

import { getResponseMessage } from "@/helper/responseMessage";
import { NextResponse } from "next/server";
import { Task } from "@/models/task";

export async function GET(request,{params}){
    const taskId = params.taskId;
 
    try {
       const task = await Task.findById(taskId)
       console.log(task);
       
       return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        
        return getResponseMessage("Error in getting task by id", 404, false)
    }

}

export async function POST(){

}

export async function PUT(request,{params}){
    try {
        const {taskId} = params;
        const {title, content, status} = await request.json();

       let task = await Task.findById(taskId)

       task.title=title,
       task.content=content,
       task.status=status

      const updatedTask =   await task.save();

       return NextResponse.json(updatedTask);
    } catch (error) {
      console.log(error);
      return getResponseMessage("Error in updating task", 404, false)

      
    }

}

export async function DELETE(request,{params}){
    const {taskId} = await params;

    try {
       await Task.deleteOne({
            _id: taskId,
        })

        return getResponseMessage("task Deleted !!", 200, true)
    } catch (error) {
        return getResponseMessage("Error in deleting task", 500, false)
    }
}