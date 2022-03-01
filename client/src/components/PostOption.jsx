import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../actions/post";
import { useOutsideAlerter } from "../utils/clickOutside";
import Modal from "./Modal";

const btnClass = "h-12 w-full border-t border-borderPrimary";

function PostOption({
  setOpenOption,
  post: {
    _id,
    posted_by: { userName },
  },
  viewPost,
  isOwner,
}) {
  const navigate = useNavigate();
  const [deleteWarning, setDeleteWarning] = useState(false);
  const optionRef = useRef(null);
  const dispatch = useDispatch();
  useOutsideAlerter(optionRef, setOpenOption);

  const deleteControl = () => {
    const data = { postId: _id, userName };
    dispatch(deletePost(data));
    setOpenOption(false);
    if (window.location.origin !== window.location.host) {
      navigate("/");
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`${window.location.host}/p/${_id}`);
  };

  return (
    <Modal>
      <div
        ref={optionRef}
        className="bg-secondary w-400 text-center flex flex-col rounded-md"
      >
        {deleteWarning ? (
          <>
            <h5 className="py-3">Are You Sure To Delete ?</h5>
            <button className={btnClass + " text-danger"} onClick={deleteControl}>Delete</button>
            <button className={btnClass} onClick={() => setDeleteWarning(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            {isOwner ? (
              <button
                className="text-danger h-12 w-full"
                onClick={()=> setDeleteWarning(true)}
              >
                Delete
              </button>
            ) : (
              <>
                <button className="text-danger h-12 w-full">Report</button>
                <button className={btnClass + " text-danger"}>Unfollow</button>
              </>
            )}

            {!viewPost && (
              <button
                className={btnClass}
                onClick={() => navigate(`/p/${_id}`)}
              >
                Go To Post
              </button>
            )}
            <button className={btnClass}>Share to...</button>
            <button className={btnClass} onClick={copyUrl}>
              Copy Link
            </button>
            <button className={btnClass} onClick={() => setOpenOption(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

export default PostOption;
