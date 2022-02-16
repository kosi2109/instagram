import React from "react";

function Friend() {
  return (
    <div className="flex justify-between items-center w-full h-16 px-3 py-2">
      <div className="flex items-center justify-start">
        <div className="w-10 h-10 bg-primary rounded-full mr-2 overflow-hidden">
        <img src="https://picsum.photos/200/300" alt="user-image" className='w-full h-full' />
        </div>
        <h5>Name</h5>
      </div>
        <button className="text-btnPrimary">Follow</button>
     
    </div>
  );
}

export default Friend;
