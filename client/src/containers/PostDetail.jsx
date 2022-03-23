import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {  getPost } from "../actions/post";
import PostOption from "../components/PostOption";

import {
  useCheckOwner,
} from "../customHook/hooks";
import hideScroll from "../utils/hideScroll";
import DetailLeft from "../components/Detail/DetailLeft";
import DetailRight from "../components/Detail/DetailRight";

function PostDetail({ width = "full" }) {
  const { id } = useParams();
  
  const [openOption, setOpenOption] = useState(false);
  const dispatch = useDispatch();
  hideScroll(openOption);

  const { post, commented , like } = useSelector((state) => state.posts);
  const isOwner = useCheckOwner(post?.posted_by.userName);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, commented , like]);

  return (
    <div className={`bg-secondary flex w-${width} border border-borderPrimary`}>
      {openOption && (
        <PostOption
          setOpenOption={setOpenOption}
          post={post}
          viewPost={true}
          isOwner={isOwner}
        />
      )}
      <DetailLeft images={post?.images} />
      <DetailRight
        post={post}
        setOpenOption={setOpenOption}
      />
    </div>
  );
}

export default PostDetail;
