import React, { useEffect } from "react";
import Header from "../components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import PostDetail from "./PostDetail";
import NotFoundPage from "./NotFoundPage";

function Main() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const logined = localStorage.getItem("profile");
  //   if (!logined) {
  //     return navigate("/accounts/login");
  //   } else {
  //     return navigate("/");
  //   }
  // }, []);
  return (
    <>
      <Header />
      <div className="bg-primary pt-16 pb-4 md:pt-20 lg:px-150 md:px-100 xl:px-250" style={{minHeight:"100vh"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p/:id" element={<PostDetail />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default Main;
