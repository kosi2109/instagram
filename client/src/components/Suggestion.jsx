import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import Friend from "./Friend";

export default function Suggestion() {
  const navigate = useNavigate();
  const user =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <div
      className="w-full p-3 flex flex-col justify-start items-start bg-secondary sticky top-20 text-sm"
      style={{ zIndex: "1" }}
    >
      <div className="flex justify-between items-center w-full py-3 ">
        <div className="flex">
          <div className="w-12 h-12 bg-primary rounded-full mr-2 overflow-hidden">
            <img
              src="https://picsum.photos/200/300"
              alt="user-image"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <h5 className="font-bold">{user?.userName}</h5>
            <h5 className="text-textSecondary ">{user?.fullName}</h5>
          </div>
        </div>
        <button className="text-btnPrimary">Switch</button>
      </div>
      <div className="flex justify-between w-full">
        <h5 className="font-medium text-textSecondary text-md">
          Suggestions For You
        </h5>
        <button>See All</button>
      </div>
      <div className="flex flex-col justify-start w-full">
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
}
