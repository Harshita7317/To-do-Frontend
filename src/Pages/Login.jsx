import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";

const Login = () => {
  const [Data, setData] = useState({
    username: "",
    password: "",
  });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    if (Data.username === "" || Data.password === "") {
      return toast.error("Please fill all fields");
    }
    const response = await axios.post(
      "http://localhost:8000/api/v1/login",
      Data
    );
    console.log(response);
    if (response.data.success) {
      const username = Data.username;
      toast.success(`Welcome ${username}`);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      setData({ username: "", password: "" });
      setTimeout(() => {
        history("/");
      }, 1000); // Delay navigation to allow toast to be visible
    }
  };
  return (
    <>
      <div className="h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
          <div className="text-2xl font-semibold">Login</div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={change}
            value={Data.username}
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
              className="bg-blue-500 text-xl font-semibold text-black px-3 py-2 rounded"
              onClick={submit}
            >
              Login
            </button>

            <Link to="/signup" className="text-gray-400 hover:text-gray-200">
              {" "}
              Not having an account? Singup here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
