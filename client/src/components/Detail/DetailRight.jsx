import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FiSend, FiSmile } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useControlLike } from "../../customHook/hooks";
import { commentPost, likePost } from "../../actions/post";
import { useDispatch } from "react-redux";
import Comments from "./Comments";
import ProfileHeader from "./ProfileHeader";

function DetailRight({ post, setOpenOption }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [liked, setLiked] = useControlLike(post);
  const likeController = () => {
    dispatch(likePost({ postId: post?._id }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(commentPost({ id: post?._id, comment }));
    setComment("");
  };
  return (
    <div className="w-full md:w-2/6 flex flex-col h-full">
      <div className="hidden md:block w-full" >
        <ProfileHeader post={post} setOpenOption={setOpenOption} />
      </div>
      {/* end header */}
      <div className=" hidden md:block flex flex-col h-350 overflow-y-auto ">
        <div className="flex items-start justify-start w-full px-3 py-2">
          <div className="flex items-start justify-start mr-2 w-1/6">
            <div className="w-full h-auto bg-danger rounded-full mr-2">
              <img src={post?.posted_by?.profile?.url} alt=""  className="w-full h-full rounded-full" />
            </div>
          </div>
          <div className="w-5/6">
            <p className="text-clip text-sm">
              <Link className="font-bold" to={`/${post?.posted_by.userName}`}>{post?.posted_by.userName} </Link> {post?.title}
            </p>
          </div>
        </div>
        {post?.comment && (
          <Comments comment={post?.comment} post_id={post?._id} />
        )}
      </div>
      {/* end comment container */}

      <div className="flex justify-between items-center py-5 px-2 w-full">
        <div>
          <button
            className="mr-4 hover:opacity-50"
            onClick={() => {
              likeController();
              setLiked(!liked);
            }}
          >
            {liked ? (
              <AiFillHeart size={25} color="red" />
            ) : (
              <AiOutlineHeart size={25} />
            )}
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
        <h6>
          {post?.likes.length < 1 ? (
            "Be the first to like this"
          ) : (
            <>
              {post?.likes.length} {post?.likes.length > 1 ? "likes" : "Like"}{" "}
            </>
          )}
        </h6>
        <h6 className="text-sm">1 HOUR AGO</h6>
      </div>
      <form className="flex w-full py-2" onSubmit={handleSubmit}>
        <button
          type="button"
          className="w-1/6 flex items-center justify-center"
        >
          <FiSmile size={25} />
        </button>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-4/6 h-8 outline-none border-none"
        />
        <button className="w-1/6 text-btnPrimary">Post</button>
      </form>
    </div>
  );
}

export default DetailRight;
