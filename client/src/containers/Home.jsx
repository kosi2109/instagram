import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post";
import Posts from "../components/Posts";
import Stories from "../components/Stories";
import Suggestion from "../components/Suggestion";

function Home() {
  const dispatch = useDispatch();
  const { posts , post } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [post]);


  return (
    <div className="flex flex-row justify-between">
      <div className="w-full lg:w-2/3 lg:mr-3">
        <div className="w-full">
          <Stories />
        </div>
        <div className="w-full">
          <Posts posts={posts} />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/3">
        <Suggestion />
      </div>
    </div>
  );
}

export default Home;
