"use client";

import { addTask } from "@/services/taskService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddTask() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
    userId: "67fced6f0f234003e66f1309",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();

    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Task added successfully", {
        position: "top-center",
      });

      setTask({
        title: "",
        content: "",
        status: "",
        userId: "67fced6f0f234003e66f1309",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task", {
        position: "top-center",
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          📝 Add Your Task
        </h1>

        <form className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="task_title" className="block text-sm font-medium mb-1 text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="task_title"
              className="w-full px-4 py-2 bg-white/10 text-white border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              value={task.title}
              autoComplete="off"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="task_content" className="block text-sm font-medium mb-1 text-gray-300">
              Content
            </label>
            <textarea
              id="task_content"
              rows={4}
              className="w-full px-4 py-2 bg-white/10 text-white border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter task content"
              onChange={(e) => setTask({ ...task, content: e.target.value })}
              value={task.content}
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="task_status" className="block text-sm font-medium mb-1 text-gray-300">
              Status
            </label>
            <select
              id="task_status"
              className="w-full px-4 py-2 bg-white/10 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTask({ ...task, status: e.target.value })}
              value={task.status}
            >
              {task.status === "" && (
                <option value="" hidden>
                  --- Select Status ---
                </option>
              )}
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit + Clear */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition-all"
              onClick={handleAddTask}
            >
              ➕ Add Task
            </button>

            <button
              type="reset"
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-500 text-white py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition-all"
              onClick={() =>
                setTask({
                  title: "",
                  content: "",
                  status: "",
                  userId: "67fced6f0f234003e66f1309",
                })
              }
            >
              🗑️ Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
