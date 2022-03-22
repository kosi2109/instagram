import React from 'react'

function ProfilePic({profile}) {
  return (
    <div className='h-full justify-center flex items-center w-2/6'>
      <div className='w-150 h-150 rounded-full overflow-hidden'>
        <img src={profile ? profile : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"} alt="profile image" className='w-full h-auto' />
      </div>
    </div>
  )
}

export default ProfilePic