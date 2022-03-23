import React from 'react';
import Post from './Post';

function Posts({posts,loading}) {
  
  return (
  <div className='flex flex-col justify-start align-center w-full mt-3 rounded-sm'>
    {posts?.map((post)=>(
      <Post post={post} />
    ))}
    {loading && <h1>Loading</h1>}
  </div>);
}

export default Posts;
