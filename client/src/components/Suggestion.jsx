import React from 'react';
import Friend from './Friend';

export default function Suggestion() {
  return <div className='w-full p-3 flex flex-col justify-start items-start bg-secondary sticky top-20 z-1'>
    <div className='flex justify-between items-center w-full py-3 '>
      <div className='flex'>
        <div className='w-12 h-12 bg-primary rounded-full mr-2'>

        </div>
        <div className='flex flex-col justify-center items-start'>
          <h5>sithuhtet.kosi21</h5>
            <h5>Si Thu Htet</h5>
        </div>
      </div>
      <button>Switch</button>
    </div>
    <h5>Suggestions For You</h5>
    <div className='flex flex-col justify-start w-full'>
      <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
    </div>
  </div>;
}
