import React, {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { AiOutlineHeart , AiFillHeart } from "react-icons/ai";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import PostOption from "./PostOption";
import hideScroll from "../utils/hideScroll";
import {  useCheckOwner } from "../customHook/hooks";
import { useDispatch } from "react-redux";
import { likePost } from "../actions/post";
import ProfileHeader from "./Detail/ProfileHeader";


function Post({ post }) {
  const [openOption, setOpenOption] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  hideScroll(openOption)
  const isOwner = useCheckOwner(post?.posted_by.userName)
  const [liked,setLiked] = useState(post?.liked)
  const likeController = ()=>{
    dispatch(likePost({postId:post?._id}))
  }
  
  
  return (
    <>
    {openOption && <PostOption setOpenOption={setOpenOption} post={post} viewPost={false} isOwner={isOwner} /> } 
    <div className="flex flex-col justify-start w-full bg-secondary md:mb-5 border border-borderPrimary rounded">
      {/* header */}
      <ProfileHeader post={post} setOpenOption={setOpenOption} />
      {/* end header */}
      {/* img */}
      
        <Carousel showThumbs={false} showArrows={true} showIndicators={post?.images.length > 1 ? true : false} showStatus={false} >
          {post?.images?.map((image) => (
            
              <img src={image.url} />
            
          ))}
        </Carousel>
      
      {/* end img */}
      <div className="flex flex-col justify-start items-start p-3">
        {/* menu */}
        <div className="flex justify-between items-center py-4 w-full">
          <div>
            <button className="mr-4 hover:opacity-50" onClick={()=>{likeController();setLiked(!liked)}}>
              {liked ? <AiFillHeart size={25} color="red" />  : <AiOutlineHeart size={25} /> }
              
            </button>
            <button onClick={() => navigate(`/p/${post._id}`)} className="mr-4 hover:opacity-50">
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
        {/* like */}
        <h5> {post.likes.length} {post.likes.length > 1 ? 'likes' : 'Like'} </h5>
        {/* name */}
        <h5>
          {post?.posted_by.userName} {post?.title}
        </h5>
        <p>View all 4 comments</p>
        <p>{moment(post?.posted_date).startOf("hour").fromNow()}</p>
      </div>
    </div>
    </>
  );
}

export default Post;
