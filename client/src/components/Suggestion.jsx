import React from "react";
import Friend from "./Friend";

export default function Suggestion() {
  const user =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile"));

  return (
    <div
      className="w-full p-3 flex flex-col justify-start items-start bg-secondary sticky top-20 text-sm"
      style={{ zIndex: "1" }}
    >
      <div className="flex justify-between items-center w-full py-3 ">
        <div className="flex">
          <div className="w-12 h-12 bg-primary rounded-full mr-2 overflow-hidden">
          <img src={user?.profile_url ? user?.profile_url : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"} alt="profile image" className='w-full h-auto' />
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
      </div>
    </div>
  );
}
