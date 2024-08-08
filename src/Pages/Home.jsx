// Home.js
import React, { useState } from "react";
import Sidebar from "../Components/Home/Sidebar";
import Navbar from "../Components/Home/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className={`flex-1 p-4 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } transition-all duration-300 ease-in-out overflow-y-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
