import React ,{useState}from "react";
import { FaYoutube } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import helperTools from "../../helper_tools";

import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isActive, setIsActive] =useState(true);

  const handleToggle=()=>{
    setIsActive(prev=>!prev);
  }


  return (
    <div className="navbar">
      <div className="nav_left">
        <RxHamburgerMenu className="icon_burger" onClick={e=>helperTools.active(document.getElementsByClassName("leftSide_drawer_container")[0])} />
        <div className="logo">
          <FaYoutube className="youTube_logo" />
          <span>YouTube</span>
        </div>
      </div>

      <div className="nav_center">
        <div className="search">
       <div className="input_container">
       <input type="text" placeholder="search" />
       <RxCross1 className="cross_icon" />
       </div>
        <div className="search_icon"> 
        <CiSearch className="search_i" />
        </div>

        </div>
        <div className="mic">
        <IoMdMic />
        </div>
      </div>

      <div className="nav_right">
        <div className="create">
          <FiPlus className="right_icon" />
          <span>Create</span>
        </div>
        <div className="bell_icon">
          <IoIosNotifications className="right_icon" />
        </div>
        <div className="nav_profile" >
          <span onClick={handleToggle}>A</span>
          <div className={`nav_auth_container  ${isActive ? "active":""}`}>
            <button><Link to={'/yourChannel'}>Sign In</Link></button>
            <button><Link to={'/'} >Sign Up</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
