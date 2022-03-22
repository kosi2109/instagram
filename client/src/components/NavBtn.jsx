import React, { useEffect, useRef, useState } from "react";
import { VscHome } from "react-icons/vsc";
import { HiHome } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import { ImCompass2 } from "react-icons/im";
import { AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsBookmark } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { useOutsideAlerter } from "../utils/clickOutside";

function NavBtn({ size, setOpenCreateModal }) {
  const [nav, setNav] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const settingRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout(navigate));
  };
  useOutsideAlerter(settingRef, setOpenSetting);

  useEffect(() => {
    setOpenSetting(false);
  }, [navigate]);

  const user =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile"));

  
  const profileSetting = "flex items-center justify-center bg-primary w-9 h-9 p-0 rounded-full"
  const profileActive = "flex items-center justify-center bg-primary w-8 h-8 p-0.5 rounded-full"
  return (
    <>
      <NavLink to="/" className="some">
        {({ isActive }) =>
          isActive ? <HiHome size={size} /> : <VscHome size={size} />
        }
      </NavLink>

      <NavLink to="/">
        <FiSend size={size} />
      </NavLink>

      <div onClick={() => setOpenCreateModal(true)} className="cursor-pointer">
        <CgAddR size={size} />
      </div>

      <NavLink to="/">
        <ImCompass2 size={size} />
      </NavLink>

      <NavLink to="/">
        <AiOutlineHeart size={size} />
      </NavLink>

      <div className="relative" ref={settingRef}>
        <div
          onClick={() => setOpenSetting(!openSetting)}
          className="flex items-center justify-center w-9 h-9 bg-textPrimary rounded-full overflow-hidden cursor-pointer relative"
        >
          <div
          id="profile"
            className={
              openSetting
                ? profileActive
                : profileSetting
            }
          >
            <img
              src={user?.profile_url}
              alt="user-image"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        {openSetting && (
          <div
            className="absolute flex flex-col bg-secondary w-250 shadow-lg"
            style={{ top: "130%", right: "-50%" }}
          >
            <Link
              to={`/${user.userName}`}
              className="py-2 pl-3 flex items-center"
            >
              {({ isActive }) => {
                isActive ? document.getElementById("profile").classList.add("p-0.5") : document.getElementById("profile").classList.remove("p-0.5");
              }}
              <CgProfile className="mr-3" /> Profile
            </Link>
            <Link to="/" className="py-2 pl-3 flex items-center">
              <BsBookmark className="mr-3" />
              Saved
            </Link>
            <Link to="/accounts/edit" className="py-2 pl-3 flex items-center">
              <IoSettingsOutline className="mr-3" />
              Settings
            </Link>
            <Link to="/" className="py-2 pl-3 flex items-center">
              <HiOutlineSwitchHorizontal className="mr-3" />
              Switch Account
            </Link>
            <button
              onClick={logoutHandler}
              className="py-2 border-t border-borderPrimary"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBtn;
