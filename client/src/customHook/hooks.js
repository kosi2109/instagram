import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const useCheckAuth = () => {
  const {user} = useSelector((state=> state.user))
  const [profile, setProfile] = useState(null)
  useEffect(()=>{
    const auth = localStorage.getItem("profile");
    if (auth) {
      setProfile(JSON.parse(auth))
    } else {
      setProfile(false)
    }
  },[user])
  return profile
};

export const useCheckOwner = (postBy) => {
  const user = useCheckAuth();
  if (user?.userName === postBy) {
    return true;
  } else {
    return false;
  }
};

export const useLikeCheck = (likes) => {
  const user = useCheckAuth();
  if (likes?.find((e) => e.liked_by.userName === user.userName)) {
    return true;
  } else {
    return false;
  }
};

export const useControlLike = (post) => {
  
  const user = useCheckAuth();
  const originalLike = post?.likes?.some((e) => e.liked_by.userName === user?.userName)
  const [liked, setLiked] = useState(originalLike)
  useEffect(()=>{
    setLiked(originalLike)
  },[post])
  return [liked,setLiked]
};


export const useScrollPageController = (pages)=>{
  const [currentPage,setCurrentPage] = useState(1)
  window.onscroll = ()=>{

    if(window.innerHeight + window.scrollY == document.body.offsetHeight){
      if (currentPage < pages){
        setCurrentPage(currentPage+1)
      }
    }
  }
  return [currentPage]
}
