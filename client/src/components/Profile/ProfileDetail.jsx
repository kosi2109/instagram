import React from 'react'
import { Link } from 'react-router-dom'
import {IoSettingsOutline} from "react-icons/io5"
import { useCheckAuth } from '../../customHook/hooks'
import {BiDotsHorizontal} from "react-icons/bi"
import { useDispatch } from 'react-redux'
import { followerControl } from '../../actions/user'

function ProfileDetail({userName,fullName,posts,followers,followings,checkFri}) {
  const user = useCheckAuth()
  const dispatch = useDispatch()
  

  const followerControlHandaler = ()=>{
    dispatch(followerControl({userName}))
  }
  
  return (
    <div className='flex flex-col justify-between items-start py-7 w-3/6'>
        <div className='flex items-center justify-start w-2/3'>
            <h5 className='text-2xl font-300 mr-12'>{userName}</h5>
            {user?.userName === userName ?
            <>
            <Link to="/accounts/edit" className='border border-borderPrimary p-1 rounded mr-12'>Edit Profile</Link>
            <Link to="/"><IoSettingsOutline size={25} /></Link>
            </>
            : 
            <>
              <button onClick={followerControlHandaler} className='bg-btnPrimary px-4 py-1 rounded-md text-secondary mr-12'>{checkFri}</button>
              <button><BiDotsHorizontal size={20} /></button>
            </> }

        </div>
        <div className='flex w-full justify-start items-center'>
            <h5 className='mr-5'>{posts} posts</h5>
            <h5 className='mr-5'>{followers?.length} followers</h5>
            <h5 className='mr-5'>{followings?.length} followings</h5>
        </div>
        <div className='flex'>
            <h5 className='text-xl font-medium'>{fullName}</h5>
        </div>
    </div>
  )
}

export default ProfileDetail