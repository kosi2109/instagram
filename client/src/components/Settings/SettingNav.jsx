import React from "react";
import { NavLink } from "react-router-dom";

function SettingNav() {
  const linkStyle = "px-7 h-14 flex items-center ";
  const activeLink = "border-l-2 border-textPrimary"
  return (
    <div className="flex flex-col w-2/6">
      <NavLink className={({isActive}) => linkStyle + (isActive ? activeLink : "" )}  to="/accounts/edit">
        Edit Profile
      </NavLink>
      <NavLink className={({isActive}) => linkStyle + (isActive ? activeLink : "" )} to="/accounts/password/change">
        Change Password
      </NavLink>
    </div>
  );
}

export default SettingNav;
