import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../actions/user";
import Category from "../components/Profile/Category";
import PreviewCardContainer from "../components/Profile/PreviewCardContainer";
import ProfileDetail from "../components/Profile/ProfileDetail";
import ProfilePic from "../components/Profile/ProfilePic";
import { useCheckAuth } from "../customHook/hooks";

function Profile() {
  const { userName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(userName));
  }, [userName]);

  const { user, posts } = useSelector((state) => state.user);

  return (
    <div>
      <div className="flex h-200">
        <ProfilePic />
        <ProfileDetail
          userName={user?.userName}
          fullName={user?.fullName}
          posts={posts?.length}
          followers={user?.followers?.length}
          followings={user?.followings?.length}
        />
      </div>

      <Category />
      <PreviewCardContainer posts={posts} />
    </div>
  );
}

export default Profile;
