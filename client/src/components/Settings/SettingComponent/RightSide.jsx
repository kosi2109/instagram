import React from 'react'

function RightSide({children}) {
  return (
    <div className='w-4/6 flex flex-col items-start justify-start px-4'>
        {children}
    </div>
  )
}

export default RightSide