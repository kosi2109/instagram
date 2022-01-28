import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';
import Friend from './Friend';

export default function Suggestion() {
  const navigate = useNavigate()
  const user = localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()

  const logoutHandler = ()=>{
    dispatch(logout(navigate))
    
  }

  return <div className='w-full p-3 flex flex-col justify-start items-start bg-secondary sticky top-20 z-1'>
    <div className='flex justify-between items-center w-full py-3 '>
      <div className='flex'>
        <div className='w-12 h-12 bg-primary rounded-full mr-2'>

        </div>
        <div className='flex flex-col justify-center items-start'>
          <h5>{user?.userName}</h5>
            <h5>{user?.fullName}</h5>
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
      <button onClick={logoutHandler} >logout</button>
    </div>
  </div>;
}
