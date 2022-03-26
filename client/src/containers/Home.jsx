import React from "react";
import Posts from "../components/Posts";
import Stories from "../components/Stories";
import Suggestion from "../components/Suggestion";


function Home() {
  
  
  return (
    <div className="flex flex-row justify-between" >
      <div className="w-full lg:w-2/3 lg:mr-3">
        <div className="w-full">
          <Stories />
        </div>
        <div className="w-full">
          <Posts/>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/3">
        <Suggestion />
      </div>
    </div>
  );
}

export default Home;
