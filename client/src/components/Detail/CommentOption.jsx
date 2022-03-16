import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/post";
import { useOutsideAlerter } from "../../utils/clickOutside";
import Modal from "../Modal";

const btnClass = "h-12 w-full border-t border-borderPrimary";

function CommentOption({
  setCommentOption,
  post_id,
  comment_id
}) {
  const optionCommentRef = useRef(comment_id);
  const dispatch = useDispatch();
  useOutsideAlerter(optionCommentRef, setCommentOption);

  const deleteCommentControl = () => {

    dispatch(deleteComment({ comment_id, post_id }));
    setCommentOption(false)
  };
 
  return (
    <Modal>
      <div
        ref={optionCommentRef}
        className="bg-secondary w-400 text-center flex flex-col rounded-md"
      >
        <button className="text-danger h-12 w-full">Report</button>
        <button onClick={deleteCommentControl} className="text-danger h-12 w-full border-t border-borderPrimary">Delete</button>
        <button className={btnClass} onClick={()=> setCommentOption(false)} >Cancel</button>
        
      </div>
    </Modal>
  );
}

export default CommentOption;
