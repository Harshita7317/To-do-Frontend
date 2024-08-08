import React, { useEffect } from "react";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Alltasks from "./Pages/Alltasks";
import Importanttasks from "./Pages/Importanttasks";
import Incompletetasks from "./Pages/Incompletetasks";
import Completedtasks from "./Pages/Completedtasks";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-gray-900 text-white h-screen p-2 relative">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Alltasks />} />
            <Route path="/importanttasks" element={<Importanttasks />} />
            <Route path="/incompletedtasks" element={<Incompletetasks />} />
            <Route path="/completedtasks" element={<Completedtasks />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
