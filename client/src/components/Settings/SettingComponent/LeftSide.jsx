import React from 'react'

function LeftSide({children}) {
  return (
    <div className='w-2/6 flex flex-col items-end text-right justify-start px-4 font-bold'>
        {children}
    </div>
  )
}

export default LeftSide