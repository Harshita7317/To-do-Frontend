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
    <>
      <div className="h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
          <div className="text-2xl font-semibold"> Signup</div>
          <input
            type="username"
            placeholder="Username"
            name="username"
            onChange={change}
            value={Data.username}
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            required
            onChange={change}
            value={Data.email}
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={change}
            value={Data.password}
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <div className="w-full flex items-center justify-between">
            <button
              className="bg-blue-500 text-xl font-semibold text-black px-3 py-2 rounded
          "
              onClick={submit}
            >
              Signup
            </button>
            <Link to="/login" className="text-gray-400 hover:text-gray-200">
              {" "}
              Already having an account? Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
