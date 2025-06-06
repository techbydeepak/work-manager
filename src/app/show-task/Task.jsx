import React, { useContext } from 'react';
import UserContext from '../context/userContext';
import { RxCross2 } from "react-icons/rx";

function Task({ task, deleteTaskParent }) {

  function deleteTask(taskId) {
    deleteTaskParent(taskId);
  }

  const { user } = useContext(UserContext);

  return (
    <div
      className={`text-3xl shadow-lg mt-2 rounded-xl ${
        task.status === "completed" ? "bg-green-800" : "bg-gray-800"
      } bg-opacity-60 backdrop-blur-md hover:bg-opacity-80 transition-all`}
    >
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {task.title}
          </h1>
          <span
            onClick={() => {
              deleteTask(task._id);
            }}
            className="shadow-lg bg-gray-950 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer hover:bg-gray-800 hover:scale-105 transition-all"
          >
            <RxCross2 className="text-white" />
          </span>
        </div>
        <p className="font-normal text-gray-300">{task.content}</p>
        <div className="flex justify-between mt-3">
          <p className="text-left text-gray-400">
            Status: <span className="font-bold">{task.status.toUpperCase()}</span>
          </p>
          <p className="text-right text-gray-400">
            Author: <span className="font-bold">{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Task;
