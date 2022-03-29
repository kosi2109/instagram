import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {IoSettingsOutline} from "react-icons/io5"
import { useCheckAuth } from '../../customHook/hooks'
import {BiDotsHorizontal} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { followerControl, getFollowers, getFollowings } from '../../actions/user'
import Modal from '../Modal'
import { useOutsideAlerter } from '../../utils/clickOutside'
import {GrClose} from "react-icons/gr"

function ProfileDetail({userName,fullName,posts,followers,followings,checkFri}) {
  const user = useCheckAuth()
  const dispatch = useDispatch()
  const [modalOpen,setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("followings")
  const modalRef = useRef(null)
  const followerControlHandaler = ()=>{
    dispatch(followerControl({userName}))
  }

  useOutsideAlerter(modalRef,setModalOpen)
  useEffect(()=>{
    if(modalOpen){
      if(modalTitle === "followers"){
        dispatch(getFollowers({userName}))
      }else{
        dispatch(getFollowings({userName}))
      }
    }
  },[modalTitle])

  const profile = useSelector(state => state.user)
  
  return (
    <div className='flex flex-col justify-between items-start py-7 w-3/6 '>
      {modalOpen && 
      <Modal>
        <div ref={modalRef} className='relative bg-secondary w-400 h-400 rounded-md flex flex-col justify-start items-center' >
          <div className='text-center w-full p-2 relative'>
            <h6>{modalTitle}</h6>
            <GrClose className='absolute top-3 right-5 cursor-pointer' onClick={()=> setModalOpen(false)} />
          </div>
          <div className='w-full border-t border-borderPrimary overflow-auto'>
            {modalTitle == 'followers' ? profile?.followers?.map(follower => (
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
            )) : profile?.followings?.map(following => (
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
          </div>
        </div>
      </Modal>
      }
        <div className='flex items-center justify-start w-full'>
            <h5 className='text-2xl font-300 mr-12'>{userName}</h5>
            {user?.userName === userName ?
            <>
            <Link to="/accounts/edit" className='border border-borderPrimary p-1 rounded mr-12'>Edit Profile</Link>
            <Link to="/"><IoSettingsOutline size={25} /></Link>
            </>
            : 
            <>
              <button onClick={followerControlHandaler} className='bg-btnPrimary px-4 py-1 rounded-md text-secondary mr-12'>{checkFri}</button>
              <button><BiDotsHorizontal size={20} /></button>
            </> }

        </div>
        <div className='flex w-full justify-start items-center'>
            <h5 className='mr-5'>{posts} posts</h5>
            <h5 className='mr-5 select-none cursor-pointer' onClick={()=> {setModalOpen(!modalOpen);setModalTitle('followers')}}>{followers?.length} followers</h5>
            <h5 className='mr-5 select-none cursor-pointer' onClick={()=> {setModalOpen(!modalOpen);setModalTitle('followings')}}>{followings?.length} followings</h5>
        </div>
        <div className='flex'>
            <h5 className='text-xl font-medium'>{fullName}</h5>
        </div>
    </div>
  )
}

export default ProfileDetail