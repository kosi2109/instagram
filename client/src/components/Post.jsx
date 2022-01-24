import React from "react";
import Sample from "../assets/sample.jpeg"
import {BsThreeDots} from "react-icons/bs"
import {FaRegComment} from "react-icons/fa"
import {BiBookmark} from "react-icons/bi"
import {FiSend} from "react-icons/fi"
import {AiOutlineHeart} from "react-icons/ai"


function Post() {
  return (
    <div className="flex flex-col justify-start w-full bg-secondary md:mb-5">
        {/* header */}
      <div className="flex justify-between items-center w-full h-16 px-3 py-2">
        <div className="flex items-center justify-start">
          <div className="w-10 h-10 bg-primary rounded-full mr-2">

          </div>
          <h5>Name</h5>
        </div>
        <div>
            <button>
                <BsThreeDots size={20}/>
            </button>
        </div>
      </div>
      {/* end header */}
        {/* img */}
        <div>
            <img src={Sample} alt="post-imge" />
        </div>
      {/* end img */}
      <div className="flex flex-col justify-start items-start px-3">
          {/* menu */}
            <div className="flex justify-between items-center py-4 w-full">
                <div>
                    <button className="mr-4"><AiOutlineHeart size={25}/></button>
                    <button className="mr-4"><FaRegComment size={25}/></button>
                    <button className="mr-4"><FiSend size={25}/></button>
                </div>
                <button> <BiBookmark size={25}/> </button>
            </div>
          {/* like */}
            <h5>115 likes</h5>
          {/* name */}
            <h5>Name</h5>
            <p>View all 4 comments</p>
            <p>23 MINUTE AGO</p>

      </div>
    </div>
  );
}

export default Post;
