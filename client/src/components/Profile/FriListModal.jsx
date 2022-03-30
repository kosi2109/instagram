import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Modal from '../Modal'
import { useOutsideAlerter } from '../../utils/clickOutside'
import {GrClose} from "react-icons/gr"
import {Link} from "react-router-dom"
import {TailSpin} from "react-loader-spinner"

function FriListModal({setModalOpen,modalTitle}) {
    const {followers , followings , loading} = useSelector(state => state.user)
    const modalRef = useRef(null)
    useOutsideAlerter(modalRef,setModalOpen)
  return (
    <Modal>
        <div ref={modalRef} className='relative bg-secondary w-400 h-400 rounded-md flex flex-col justify-start items-center' >
            
          <div className='text-center w-full p-2 relative'>
            <h6>{modalTitle}</h6>
            <GrClose className='absolute top-3 right-5 cursor-pointer' onClick={()=> setModalOpen(false)} />
          </div>
          <div className='w-full border-t border-borderPrimary overflow-auto'>
              {loading ? 
              (<>
                <div className='w-full h-300 flex items-center justify-center' >
                    <TailSpin width={30} color="black" />
                </div>
            </>) : ( <>
            {modalTitle === 'followers' ? followers?.map(follower => (
              <div className='flex w-full justify-between p-2 items-center'>
              <div className='flex items-center'>
                <div className='rounded-full w-10 h-10 overflow-hidden mr-2'>
                  <img width={50} src={follower.profile.url} alt={follower.userName} />
                </div>
                <Link to={`/${follower.userName}`}>
                  <h6 className='hover:underline'>{follower.userName}</h6>
                </Link>
              </div>
                <button className='bg-secondary py-1 px-2 border border-borderPrimary text-sm' >Followings</button>
            </div>
            )) : followings?.map(following => (
              <div className='flex w-full justify-between p-2 items-center'>
                <div className='flex items-center'>
                  <div className='rounded-full w-10 h-10 overflow-hidden mr-2'>
                    <img width={50} src={following.profile.url} alt={following.userName} />
                  </div>
                  <Link to={`/${following.userName}`}>
                    <h6 className='hover:underline'>{following.userName}</h6>
                  </Link>
                </div>
                
                  <button className='bg-secondary py-1 px-2 border border-borderPrimary text-sm' >Followings</button>
                
                
              </div>
            )) }
            </>)}
          </div>
        </div>
    </Modal>
  )
}

export default FriListModal