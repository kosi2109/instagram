import React from 'react';
import Post from './Post';

function Posts({posts}) {

  return (
  <div className='flex flex-col justify-start align-center w-full mt-3 rounded-sm'>
    {posts.map((post)=>(
      <Post post={post} />
    ))}
  </div>);
}

export default Posts;
