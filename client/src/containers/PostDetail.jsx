import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend, FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";
import { commentPost, getPost, likePost } from "../actions/post";
import PostOption from "../components/PostOption";
import { useCheckAuth, useCheckOwner, useControlLike, useLikeCheck } from "../customHook/hooks";
import hideScroll from "../utils/hideScroll";

function PostDetail({width="full"}) {
  const {id} = useParams()
  const [comment , setComment] = useState("")
  const [openOption, setOpenOption] = useState(false)
  const dispatch = useDispatch()
  const user = useCheckAuth()
  hideScroll(false)
  
  const {post,commented} = useSelector((state)=> state.posts) 
  const isOwner = useCheckOwner(post?.posted_by.userName)
  const [liked ,setLiked] = useControlLike(post)
  const likeController = ()=>{
    dispatch(likePost({postId:post?._id}))
  }

  useEffect(()=>{
    dispatch(getPost(id))
  },[id,likeController,commented])

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(commentPost({id:post?._id , comment }))
  }

  return (
      <div className={`bg-secondary flex w-${width} border border-borderPrimary`}>
        {openOption && <PostOption setOpenOption={setOpenOption} post={post} viewPost={true} isOwner={isOwner} /> }
        <div className="w-4/6 h-auto flex items-center justify-center">
        <Carousel showThumbs={false} showArrows={true} showIndicators={true} showStatus={false} >
        {post?.images?.map((image) => (
            
            <img src={image.url} />
          
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

            {post?.comment.map((com,index)=>(
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
            ))}

           
          </div>
          {/* end comment container */}
          
            <div className="flex justify-between items-center py-5 px-2 w-full">
              <div>
                <button className="mr-4 hover:opacity-50" onClick={()=> {likeController();setLiked(!liked)}}>
                {liked ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} /> }
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
            <h6>{post?.likes.length < 1 ? "Be the first to like this" :<> {post?.likes.length} {post?.likes.length > 1 ? 'likes' : 'Like'} </> }</h6>
            <h6 className="text-sm" >1 HOUR AGO</h6>
          </div>
          <form  className="flex w-full py-2" onSubmit={handleSubmit} >
              <button type="button" className="w-1/6 flex items-center justify-center" ><FiSmile size={25} /></button>
              <input type="text" name="comment" value={comment} onChange={(e)=> setComment(e.target.value)}  className="w-4/6 outline-none border-none" />
              <button className="w-1/6 text-btnPrimary">Post</button>
          </form>
        </div>
      </div>

  );
}

export default PostDetail;
