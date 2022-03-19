import React from 'react'

function Container({children}) {
  return (
    <div className='w-full flex py-3'>
        {children}
    </div>
  )
}

export default Container