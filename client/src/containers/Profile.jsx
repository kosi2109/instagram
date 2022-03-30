import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getOwnProfile, getUserProfile } from "../actions/user";
import Category from "../components/Profile/Category";
import PreviewCardContainer from "../components/Profile/PreviewCardContainer";
import ProfileDetail from "../components/Profile/ProfileDetail";
import ProfilePic from "../components/Profile/ProfilePic";


function Profile() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('profile'))
  const { follow , user , posts , profile } = useSelector((state) => state.user);
  const [checkFri, setCheckFri] = useState("")

  useEffect(() => {
    dispatch(getUserProfile(userName));
    dispatch(getOwnProfile(auth?.userName));
  }, [follow,userName]);
  
  useEffect(()=>{
    checkFriended()
  },[profile,user])

  const checkFriended = ()=>{
    const you_follow_me = profile?.followers?.includes(user?._id)
    const i_follow_you = profile?.followings?.includes(user?._id)
    if (you_follow_me){
      if(i_follow_you){
        setCheckFri("Friend")
      }else{
        setCheckFri("Follow Back")
      }
    }else{
      if(i_follow_you){
        setCheckFri("Unfollow")
      }else{
        setCheckFri("Follow")
      }
    }
  }

  return (
    <div className="min-h-screen ">
      <div className="flex h-200 w-full">
        <ProfilePic profile={user?.profile?.url} />
        <ProfileDetail
          userName={user?.userName}
          fullName={user?.fullName}
          posts={posts?.length}
          followers={user?.followers}
          followings={user?.followings}
          checkFri={checkFri}
        />
      </div>

      <Category />
      <PreviewCardContainer posts={posts} />
    </div>
  );
}

export default Profile;
