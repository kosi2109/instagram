import React from "react";
import { Link } from "react-router-dom";

function Friend({user , followBtn=true}) {
  return (
    <Link to={`/${user?.userName}`} >
    <div className="flex justify-between items-center w-full h-16 px-3 py-2 hover:bg-primary cursor-pointer">
      <div className="flex items-center justify-start">
        <div className="w-10 h-10 bg-primary rounded-full mr-2 overflow-hidden">
        <img src={user?.profile?.url} alt="user-image" className='w-full h-full' />
        </div>
        <h5>{user?.userName}</h5>
      </div>
    </div>
    </Link>
  );
}

export default Friend;
