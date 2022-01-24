import React from 'react';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';
import Stories from '../components/Stories';
import Suggestion from '../components/Suggestion';

function Home() {
  return (
    <div className='bg-primary flex flex-row justify-between pt-16 md:pt-20 lg:px-150 md:px-100 xl:px-250'>
        <div className='w-full lg:w-2/3 lg:mr-3'>
            <div className='w-full'>
                <Stories/>
            </div>
            <div className='w-full'>
                <Posts/>
            </div>
        </div>
        <div className='hidden lg:block lg:w-1/3'>
            <Suggestion/>
        </div>
    </div>);
}

export default Home;
