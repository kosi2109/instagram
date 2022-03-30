import React from 'react'

function ProfileImg({url}) {
  return (
    <div className="w-10 h-10 rounded-full mr-2">
        <img src={url} alt=""  className="w-full h-full rounded-full" />
    </div>
  )
}

export default ProfileImg