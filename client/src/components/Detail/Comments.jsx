import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentOption from "./CommentOption";
import hideScroll from "../../utils/hideScroll";
import { BsThreeDots } from "react-icons/bs";

function Comments({ comment, post_id }) {
  const [commentOption, setCommentOption] = useState(false);
  const [commentId, setCommentId] = useState("")
  hideScroll(commentOption);
  
  return (
    <>
      {commentOption && (
        <CommentOption
          setCommentOption={setCommentOption}
          post_id={post_id}
          comment_id={commentId}
        />
      )}
      {comment?.map((com, index) => (
        <div className="flex w-full flex-col group" key={index}>
          {/* top */}
          <div className="flex items-start justify-start w-full px-3 py-2">
            <div className="flex items-start justify-start mr-2 w-1/6">
              <div className="w-full h-auto bg-danger rounded-full mr-2">
              <img
              src={com?.comment_by?.profile?.url}
              alt="user-image"
              className="w-full h-full rounded-full"
              />
              </div>
              
            </div>
            <div className="w-5/6">

              <p className="text-clip text-sm"><Link className="font-bold" to={`/${com?.comment_by?.userName}`}>{com?.comment_by?.userName}</Link> {com?.comment}</p>
            </div>
          </div>
          {/* btn */}
          <div className="ml-16 flex">
            <h5 className="text-sm font-light mr-4">
              {moment(com?.comment_date).startOf("hour").fromNow()}
            </h5>
            <button className="text-sm mr-3 ">Reply</button>

            <button
              onClick={() => {setCommentOption(true);setCommentId(com._id)}}
              className="text-sm group-hover:opacity-100 opacity-0 items-center"
            >
              <BsThreeDots size={13} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;
