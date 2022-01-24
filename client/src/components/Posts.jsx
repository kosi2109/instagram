import React from 'react';
import Post from './Post';

function Posts() {
  return <div className='flex flex-col justify-start align-center w-full mt-3 rounded-sm'>
    <Post/>
    <Post/>
    <Post/>
  </div>;
}

export default Posts;
