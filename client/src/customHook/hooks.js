import { useEffect, useState } from "react";


export const useCheckAuth = () => {
  const auth = localStorage.getItem("profile");
  if (auth) {
    return JSON.parse(auth);
  } else {
    return false;
  }
};

export const useCheckOwner = (postBy) => {
  const user = useCheckAuth();
  if (user.userName === postBy) {
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
  const originalLike = post?.likes?.some((e) => e.liked_by.userName === user.userName)
  const [liked, setLiked] = useState(originalLike)
  useEffect(()=>{
    setLiked(originalLike)
  },[post])
  return [liked,setLiked]
};
