import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios"; // to get data from backend
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    if (Data.username === "" || Data.email === "" || Data.password === "") {
      return toast.warning("Please fill all the fields");
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/signin",
        Data
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000); // Delay navigation to allow toast to be visible
      } else {
        toast.error(response.data.message || "Signup failed");
      }
      setData({ username: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="p-6 w-full max-w-md bg-gray-800 rounded-lg">
        <div className="text-2xl font-semibold mb-4">Signup</div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={change}
          value={Data.username}
          className="bg-gray-700 text-white px-4 py-2 mb-4 w-full rounded"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={change}
          value={Data.email}
          className="bg-gray-700 text-white px-4 py-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={change}
          value={Data.password}
          className="bg-gray-700 text-white px-4 py-2 mb-4 w-full rounded"
        />
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <button
            className="bg-blue-500 text-xl font-semibold text-white px-4 py-2 rounded mb-4 sm:mb-0"
            onClick={submit}
          >
            Signup
          </button>
          <Link
            to="/login"
            className="text-gray-400 mt-3 mr-4 hover:text-gray-200"
          >
            Already have an account?
            <span className="ml-2 mt-4 font-semibold text-gray-100">
              Login here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
