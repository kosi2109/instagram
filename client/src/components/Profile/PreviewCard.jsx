import React from "react";
import { Link } from "react-router-dom";
import {AiOutlineHeart} from "react-icons/ai"
import {FaRegComment} from "react-icons/fa"

function PreviewCard({ image ,likes ,comments , slug}) {
  return (
    <Link to={`/p/${slug}`}>
      <div className="w-full relative group flex justify-center items-center">
        <div className="flex justify-around items-center w-full h-full absolute px-12" >
            <div style={{zIndex:0}} className="absolute w-full h-full opacity-0 group-hover:opacity-50 bg-textPrimary">

            </div>
            <div style={{zIndex:2}} className="opacity-0 group-hover:opacity-100 flex text-secondary items-center justify-center">
                <AiOutlineHeart size={25} color="white" className="mr-2"/>
                <h6 className="text-lg">{likes}</h6>
            </div>
            <div style={{zIndex:2}} className="opacity-0 group-hover:opacity-100 flex text-secondary items-center justify-center">
                <FaRegComment size={25} color="white" className="mr-2"/>
                <h6 className="text-lg">{comments}</h6>
            </div>
        </div>
        <img src={image?.url} alt="img" class="w-full aspect-square" />
      </div>
    </Link>
  );
}

export default PreviewCard;
