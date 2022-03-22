import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { clearError } from '../actions/error';

function Notification({message}) {
    const dispatch = useDispatch()
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(clearError());
        },2000)
    },[message])

    
  return (
    <div className='fixed bottom-0 left-0 bg-textPrimary w-full px-3 py-2 text-secondary' id="noti">
        {message}
    </div>
  )
}

export default Notification