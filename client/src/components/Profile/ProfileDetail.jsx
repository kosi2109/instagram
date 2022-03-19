import React from 'react'
import { Link } from 'react-router-dom'
import {IoSettingsOutline} from "react-icons/io5"

function ProfileDetail({userName,fullName,posts,followers,followings}) {
  return (
    <div className='flex flex-col justify-between items-start py-7 w-3/6'>
        <div className='flex items-center justify-between w-2/3'>
            <h5 className='text-2xl font-300'>{userName}</h5>
            <Link to="/accounts/edit" className='border border-borderPrimary p-1 rounded'>Edit Profile</Link>
            <Link to="/"><IoSettingsOutline size={25} /></Link>
        </div>
        <div className='flex w-full justify-start items-center'>
            <h5 className='mr-5'>{posts} posts</h5>
            <h5 className='mr-5'>{followers} followers</h5>
            <h5 className='mr-5'>{followings} followings</h5>
        </div>
        <div className='flex'>
            <h5 className='text-xl font-medium'>{fullName}</h5>
        </div>
    </div>
  )
}

export default ProfileDetail