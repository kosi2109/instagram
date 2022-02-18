import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend, FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../actions/post";
import Sample from "../assets/sample.jpeg";
import PostOption from "../components/PostOption";
import hideScroll from "../utils/hideScroll";

function PostDetail() {
  const {id} = useParams()
  const [openOption, setOpenOption] = useState(false)
  const dispatch = useDispatch()
  hideScroll(false)

  useEffect(()=>{
    dispatch(getPost(id))
  },[id])

  const post = useSelector((state)=> state.posts.post) 

  return (
      <div className="bg-secondary flex w-full border border-borderPrimary">
        {openOption && <PostOption setOpenOption={setOpenOption} post={post} viewPost={true} /> }
        <div className="w-4/6 h-auto flex items-center justify-center">
        <Carousel showThumbs={false} showArrows={true} showIndicators={true} showStatus={false} >
          {post?.images?.map((image) => (
            
              <img src={image} alt="image" className="w-full h-auto"/>
            
          ))}
        </Carousel>
     
        </div>
        <div className="w-2/6 flex flex-col h-full">
          <div className="flex justify-between items-center w-full h-14 px-3 py-2 border-b border-borderPrimary">
            <div className="flex items-center justify-start">
              <div className="w-10 h-10 bg-primary rounded-full mr-2 bg-danger"></div>
              <Link to={`/${post?.posted_by.userName}`}>
                <h5>{post?.posted_by.userName}</h5>
              </Link>
            </div>
            <div>
              <button onClick={()=> setOpenOption(true)}>
                <BsThreeDots size={20} />
              </button>
            </div>
          </div>
          {/* end header */}
          <div className="flex flex-col h-350 overflow-y-auto ">
            <div className="flex items-start justify-start w-full px-3 py-2">
              <div className="flex items-start justify-start mr-2 w-2/6">
                <div className="w-10 h-10 bg-danger rounded-full mr-2"></div>
                <Link className="font-bold" to={`/${post?.posted_by.userName}`}>
                  <h5>kosi</h5>
                </Link>
              </div>
              <div className="w-4/6">
                <p className="text-clip text-sm">
                  {post?.title}
                </p>
              </div>
            </div>

            

           
          </div>
          {/* end comment container */}
          
            <div className="flex justify-between items-center py-5 px-2 w-full">
              <div>
                <button className="mr-4 hover:opacity-50">
                  <AiOutlineHeart size={25} />
                </button>
                <button className="mr-4 hover:opacity-50">
                  <FaRegComment size={25} />
                </button>
                <button className="mr-4 hover:opacity-50">
                  <FiSend size={25} />
                </button>
              </div>
              <button className="hover:opacity-50">
                <BiBookmark size={25} />
              </button>
            </div>
          <div className="flex flex-col px-3">
            <h6>Be the first to like this</h6>
            <h6 className="text-sm" >1 HOUR AGO</h6>
          </div>
          <div className="flex w-full py-2" >
              <button className="w-1/6 flex items-center justify-center" ><FiSmile size={25} /></button>
              <input type="text" className="w-4/6 outline-none border-none" />
              <button className="w-1/6 text-btnPrimary">Post</button>
          </div>
        </div>
      </div>

  );
}

export default PostDetail;
