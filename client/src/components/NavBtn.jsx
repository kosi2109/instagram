import React from "react";
import {VscHome} from "react-icons/vsc"
import {FiSend} from "react-icons/fi"
import {CgAddR} from "react-icons/cg"
import {ImCompass2} from "react-icons/im"
import {AiOutlineHeart} from "react-icons/ai"
import {BsSearch} from "react-icons/bs"
import { NavLink } from "react-router-dom";

function NavBtn({size}) {
  return (
    <>
      <NavLink to="/">
        <VscHome size={size} />
      </NavLink>

      <NavLink to="/">
        <FiSend size={size} />
      </NavLink>

      <NavLink to="/">
        <CgAddR size={size} />
      </NavLink>

      <NavLink to="/">
        <ImCompass2 size={size} />
      </NavLink>

      <NavLink to="/">
        <AiOutlineHeart size={size} />
      </NavLink>

      <NavLink to="/">
        <div className="w-8 h-8 bg-primary rounded-full"></div>
      </NavLink>
    </>
  );
}

export default NavBtn;
