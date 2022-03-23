import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post";
import Posts from "../components/Posts";
import Stories from "../components/Stories";
import Suggestion from "../components/Suggestion";
import {  useScrollPageController } from "../customHook/hooks";

function Home() {
  const dispatch = useDispatch();
  const {pages, posts , success , current_page , loading} = useSelector((state) => state.posts);
  const [currentPage] = useScrollPageController(pages)
 
  useEffect(() => {
    if(currentPage < current_page+1){
      dispatch(getPosts({page:currentPage}));
    }
  }, [ success, currentPage]);
  
  return (
    <div className="flex flex-row justify-between" >
      <div className="w-full lg:w-2/3 lg:mr-3">
        <div className="w-full">
          <Stories />
        </div>
        <div className="w-full">
          <Posts posts={posts} loading={loading} />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/3">
        <Suggestion />
      </div>
    </div>
  );
}

export default Home;
