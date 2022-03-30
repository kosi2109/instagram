import React, { useEffect,  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoSettingsOutline} from "react-icons/io5"
import { useCheckAuth } from '../../customHook/hooks'
import {BiDotsHorizontal} from "react-icons/bi"
import { useDispatch } from 'react-redux'
import { followerControl, getFollowers, getFollowings } from '../../actions/user'

import FriListModal from './FriListModal'

function ProfileDetail({userName,fullName,posts,followers,followings,checkFri}) {
  const user = useCheckAuth()
  const dispatch = useDispatch()
  const location = useNavigate()
  const [modalOpen,setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("followings")
  
  const followerControlHandaler = ()=>{
    dispatch(followerControl({userName}))
  }

  useEffect(()=>{
    setModalOpen(false)
  },[location])

  useEffect(()=>{
    if(modalOpen){
      if(modalTitle === "followers"){
        dispatch(getFollowers({userName}))
      }else{
        dispatch(getFollowings({userName}))
      }
    }
  },[modalTitle,modalOpen])

  
  
  return (
    <div className='flex flex-col justify-between items-start py-7 4/6 md:w-3/6 '>
      {modalOpen && <FriListModal setModalOpen={setModalOpen} modalTitle={modalTitle} /> }
        <div className='flex items-center justify-start w-full'>
            <h5 className='text-2xl font-300 mr-2 md:mr-12'>{userName}</h5>
            {user?.userName === userName ?
            <>
            <Link to="/accounts/edit" className='border border-borderPrimary p-1 rounded md:mr-12 mr-2'>Edit Profile</Link>
            <Link to="/"><IoSettingsOutline size={25} /></Link>
            </>
            : 
            <>
              <button onClick={followerControlHandaler} className='bg-btnPrimary px-4 py-1 rounded-md text-secondary md:mr-12 mr-2'>{checkFri}</button>
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