import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

import axios from "axios";

const Cards = ({ home, SetInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handlecompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      toast.success("Task completed!");
    } catch (error) {
      toast.error("Failed to mark task as complete");
    }
  };
  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      //   console.log(response);
      toast.success("Task marked as important!");
    } catch (error) {
      toast.error("Failed to mark task as important");
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v2/delete-task/${id}`, {
        headers,
      });
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };
  const handleUpdate = async (id, title, desc) => {
    SetInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        {data &&
          data.map((item, i) => (
            <div className="flex flex-col justify-between bg-gray-700 rounded-sm p-4">
              <div className="">
                <h1 className="text-xl font-semihold">{item.title}</h1>
                <p className="text-gray-300 my-2">{item.desc}</p>
              </div>
              <div className="mt-4 w-full flex items-center">
                <button
                  className={`${
                    item.complete === false ? "bg-red-400" : "bg-green-700"
                  } p-2 rounded`}
                  onClick={() => handlecompleteTask(item._id)}
                >
                  {item.complete === true ? "Completed" : "Incomplete"}
                </button>
                <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                  <button onClick={() => handleImportantTask(item._id)}>
                    {item.important === false ? (
                      <CiHeart />
                    ) : (
                      <FaHeart className="text-red-500" />
                    )}
                  </button>
                  {home !== "false" && (
                    <button
                      onClick={() =>
                        handleUpdate(item._id, item.title, item.desc)
                      }
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button onClick={() => deleteTask(item._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        {home === "true" && (
          <button
            className="flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 hover:scale-105 cursor-pointer transition-all duration-300"
            onClick={() => SetInputDiv("fixed")}
          >
            <IoIosAddCircle className="text-5xl" />
            <h2 className="text-2xl mt-4 ">Add Task</h2>
          </button>
        )}
      </div>
    </>
  );
};

export default Cards;
