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

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important task",
      icons: <MdLabelImportant />,
      link: "/importanttasks",
    },
    {
      title: "Incompleted tasks",
      icons: <FaCheckDouble />,
      link: "/incompletedtasks",
    },
    {
      title: "Completed tasks",
      icons: <TbNotebookOff />,
      link: "/completedtasks",
    },
  ];
  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    toast.success("Successfully logged out!");
    // Add a delay before navigating to allow the toast message to show

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
        console.log(response);
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
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold ">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="my-2 flex items-center hover: bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {item.icons}
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button onClick={logout} className="bg-gray-600 w-full p-2 rounded">
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
