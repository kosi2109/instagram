import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOutsideAlerter } from '../utils/clickOutside'
import Modal from './Modal'

const btnClass = "h-12 w-full border-t border-borderPrimary"

function PostOption({setOpenOption,post:{_id},viewPost}) {
    const navigate = useNavigate()
    const optionRef = useRef(null)
    useOutsideAlerter(optionRef,setOpenOption)
  return (
    <Modal>
        <div ref={optionRef} className='bg-secondary w-400 text-center flex flex-col rounded-md'>
            <button className='text-danger h-12 w-full'>Delete</button>
            {!viewPost && 
            
            <button className={btnClass} onClick={()=> navigate(`/p/${_id}`)} >Go To Post</button>
            }
            <button className={btnClass}>Share to...</button>
            <button className={btnClass}>Copy Link</button>
            <button className={btnClass} onClick={()=> setOpenOption(false)} >Cancel</button>
        </div>
    </Modal>
  )
}

export default PostOption