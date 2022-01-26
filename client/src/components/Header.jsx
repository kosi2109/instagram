import React, { useState } from "react";
import logo from "../assets/logo.png";

import { NavLink } from "react-router-dom";
import SearchResult from "./SearchResult";
import CreatePost from "./CreatePost";
import NavBtn from "./NavBtn";

function Header() {
  const [searchActive, setSearchActive] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <>
      <nav className="fixed w-screen bg-secondary shadow-sm flex justify-center px-2 items-center h-16 lg:px-150 md:px-100 xl:px-250">
        <div className="w-1/2 mr-5 h-full flex justify-start items-center sm:w-1/3">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-full h-full" />
          </NavLink>
        </div>

        <div className="hidden sm:flex relative h-full justify-center items-center sm:w-1/3">
          <input
            type="text"
            className="bg-primary h-9 w-full rounded-md outline-none p-3"
            placeholder="search"
            onClick={() => setSearchActive(true)}
          />
          {searchActive ? (
            <SearchResult setSearchActive={setSearchActive} />
          ) : (
            ""
          )}
        </div>
        <div className=" justify-between items-center hidden md:flex sm:w-1/3 md:px-5">
          <NavBtn size="25" setOpenCreateModal={setOpenCreateModal} />
        </div>
        <div className="flex justify-between items-center w-1/2 md:hidden">
          <NavBtn size="20" setOpenCreateModal={setOpenCreateModal} />
        </div>
      </nav>
      {openCreateModal && (
        <CreatePost setOpenCreateModal={setOpenCreateModal} />
      )}
    </>
  );
}

export default Header;
