import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { toast } from "react-hot-toast";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    toast.success("Successfully logged out!");
    setTimeout(() => {
      window.location.href = "/signup";
    }, 1000);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <button
        className="text-2xl md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button
        onClick={logout}
        className="bg-gray-600 p-2 rounded hover:bg-gray-700 transition-all duration-300"
      >
        Log Out
      </button>
    </header>
  );
};

export default Navbar;
