import React, { useState, useEffect } from "react";
import Cards from "../Components/Cards";
import { IoIosAddCircle } from "react-icons/io";
import InputData from "../Components/Home/InputData";
import axios from "axios";

const Alltasks = () => {
  const [InputDiv, SetInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v2/get-all-tasks",
        { headers }
      );
      // console.log(response);

      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  });

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button onClick={() => SetInputDiv("fixed")}>
          <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
        </button>
      </div>
      {Data && (
        <Cards
          home={"true"}
          SetInputDiv={SetInputDiv}
          data={Data.tasks}
          setUpdatedData={setUpdatedData}
        />
      )}
      <InputData
        InputDiv={InputDiv}
        SetInputDiv={SetInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
      />
    </div>
  );
};

export default Alltasks;
