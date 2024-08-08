import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { toast } from "react-hot-toast";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes className="text-2xl mr-3" />,
      link: "/",
    },
    {
      title: "Important task",
      icon: <MdLabelImportant className="text-2xl mr-3" />,
      link: "/importanttasks",
    },
    {
      title: "Incompleted tasks",
      icon: <FaCheckDouble className="text-2xl mr-3" />,
      link: "/incompletedtasks",
    },
    {
      title: "Completed tasks",
      icon: <TbNotebookOff className="text-2xl mr-3" />,
      link: "/completedtasks",
    },
  ];
  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    toast.success("Successfully logged out!");
    history("/signup");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v2/get-all-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);
  return (
    <aside
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } w-full md:max-w-xs bg-gray-800 text-white p-4 md:block`}
    >
      {Data && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="text-gray-400">{Data.email}</h4>
          <hr className="my-2" />
        </div>
      )}
      <nav>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="flex items-center p-2 my-2 rounded hover:bg-gray-600 transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
          >
            <span className="mr-3 text-2xl">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="mt-4">
        <button
          onClick={logout}
          className="bg-gray-600 w-full p-2 rounded hover:bg-gray-700 transition-all duration-300"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
