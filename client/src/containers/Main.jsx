import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import PostDetail from "./PostDetail";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import Notification from "../components/Notification";


function Main() {
  const {success} = useSelector(state => state.error)
  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <div className="pt-16 pb-4 md:pt-20 lg:px-150 md:px-100 xl:px-250">
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/p/:id" element={<PostDetail />} />
          <Route path="/:userName" element={<Profile />} />
          <Route path="/accounts/*" element={<Settings />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        
      </div>
      {success && <Notification message={success} />}
    </div>
  );
}

export default Main;
