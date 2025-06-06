"use client";

import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import Task from "./Task";
import { toast } from "react-toastify";

function ShowTasks() {
  const context = useContext(UserContext);

  const [tasks, setTasks] = useState([]);
  async function loadTasks(userId) {
    try {
      const tasks = await getTasksOfUser(userId);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deleteTaskParent(tasksId) {
    try {
      const result = await deleteTask(tasksId);
      console.log(result);
      const newTasks = tasks.filter((item) => item._id !== tasksId);
      setTasks(newTasks);
      toast.success("Your task has been deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task.");
    }
  }

  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-12 sm:col-span-8 sm:col-start-3 p-6 bg-gray-900 rounded-xl shadow-xl bg-opacity-60 backdrop-blur-md hover:bg-opacity-80 transition-all">
        <h1 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
          Your Tasks ({tasks.length})
        </h1>
        {tasks.length === 0 ? (
          <p className="text-xl text-gray-400 text-center">No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent} />
          ))
        )}
      </div>
    </div>
  );
}

export default ShowTasks;
