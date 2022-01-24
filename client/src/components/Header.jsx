import React, { useState } from 'react';
import logo from "../assets/logo.png"

import {NavLink} from "react-router-dom"
import SearchResult from './SearchResult';
import CreatePost from './CreatePost';
import NavBtn from './NavBtn';


function Header() {
    const [searchActive ,setSearchActive] = useState(false)
    const open = true;
  return ( 
      <>
  <nav className='fixed w-screen bg-secondary shadow-sm flex justify-between px-2 items-center h-16 lg:px-150 md:px-100 xl:px-250'>
      <NavLink to="/" >
        <div className='w-100 mr-5 h-full flex justify-start items-center lg:w-120'>
            <img src={logo} alt="logo" className='w-full h-full' />
        </div>
        </NavLink>
      
      <div className='hidden sm:block relative h-full flex justify-center items-center lg:w-1/3'>
          <input type="text" className='bg-primary h-9 min-w-50 rounded-md outline-none p-3 mt-3' placeholder="search" onClick={()=> setSearchActive(true)} />
          {searchActive ? <SearchResult setSearchActive={setSearchActive} /> : "" } 
      </div>
      <div className=' justify-between items-center hidden md:flex md:w-350 lg:w-200' >
        <NavBtn size="25" />
      </div>
      <div className='flex justify-between items-center w-300 md:hidden' >
        <NavBtn size="20" />
      </div>
  </nav>
  
  </>);
}

export default Header;
