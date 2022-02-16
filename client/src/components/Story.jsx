import React from "react";

function Story() {
  return (
    <div className="w-28 h-28 flex flex-col justify-center items-center mx-2 cursor-pointer">
      <div className="w-16 h-16 rounded-full bg-primary mb-1 overflow-hidden">
        <img src="https://picsum.photos/200" alt="user-image" className='w-full h-full' />
      </div>
      <h5 className="text-sm">Name</h5>
    </div>
  );
}

export default Story;
