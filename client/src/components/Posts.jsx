import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post';
import LazyLoading from './LazyLoading';
import Post from './Post';

function Posts() {
  const [page,setPage] = useState(1);
  
  const dispatch = useDispatch();
  const observer = useRef()
  const {pages, posts , success , current_page , loading} = useSelector((state) => state.posts);
  const [hasMore,setHasMore] = useState(!(pages == current_page));
  
  useEffect(() => {
    if(hasMore){
      dispatch(getPosts({page:page}));
    }
  }, [success,page]);

  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        if (current_page == pages){
          setHasMore(false)
        }
        if (current_page < pages){
          setPage(page + 1)
        }
      }
    },{rootMargin:"-50px"})
    if (node) observer.current.observe(node)
  }, [loading])
  
  return (
  <div className='flex flex-col justify-start align-center w-full mt-3 rounded-sm'>
    {posts?.map((post,index)=>{
      if(posts.length == index +1 ){
        return <div ref={lastBookElementRef}><Post post={post} /></div>
      }else{
        return <Post post={post} />
      }
  })}
  {loading && <LazyLoading/>}
    
  </div>);
}

export default Posts;
