import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ProfileImg from '../ProfileImg'

function ProfileHeader({post , setOpenOption}) {
  return (
    <div className="flex justify-between items-center w-full h-14 px-3 py-2 border-b border-borderPrimary">
        <div className="flex items-center justify-start">
            <ProfileImg url={post?.posted_by?.profile?.url} />
          <Link to={`/${post?.posted_by.userName}`}>
            <h5>{post?.posted_by.userName}</h5>
          </Link>
        </div>
        <div>
          <button onClick={() => setOpenOption(true)}>
            <BsThreeDots size={20} />
          </button>
        </div>
      </div>
  )
}

export default ProfileHeader