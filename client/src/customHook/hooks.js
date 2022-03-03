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
  if (user.userName == postBy) {
    return true;
  } else {
    return false;
  }
};

export const useLikeCheck = (likes) => {
    const user = useCheckAuth()
  if (likes?.find((e) => e.liked_by.userName == user.userName)) {
    return true;
  } else {
    return false;
  }
};
