import React, { useEffect } from 'react';
import Header from "../components/Header"
import {Route , Routes, useNavigate} from "react-router-dom"
import Home from './Home';

function Main() {
  const navigate = useNavigate()
  

  useEffect(()=>{
    const logined = localStorage.getItem("profile")
    if (!logined){
       return navigate('/accounts/login')
    }else{
      return navigate('/')
    }
    
  },[])
  return <>
  <Header/>
    <Routes>
        <Route path="/" element={<Home/>} />
    </Routes>
  </>;
}

export default Main;
