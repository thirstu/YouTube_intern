import React ,{useEffect, useState}from "react";
import { FaYoutube } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import helperTools from "../../helper_tools";
import { Link ,useNavigate,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import Login_Page from "../../pages/login_page/Login_Page.jsx";
import Signup_Page from "../../pages/signup_page/Signup_Page.jsx";
import { logout } from "../../reducers/users.reducer.js";
import VideoUploadAndEdit_Page from "../../pages/video_upload_and_edit_page/VideoUploadAndEdit_Page.jsx";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, user,accessToken } = useSelector((state) => state.user);

  const [isActive, setIsActive] =useState(true);

  const handleToggle=()=>{
    setIsActive(prev=>!prev);
  }
  useEffect(()=>{
    setIsActive(true)

  },[location.pathname])


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
        <div className="create" onClick={()=>{
          navigate("/uploadAndEdit")

        }}>
          <FiPlus className="right_icon" />
          <span>Create</span>
        </div>
        <div className="bell_icon">
          <IoIosNotifications className="right_icon" />
        </div>
        <div className="nav_profile" >
          <span onClick={handleToggle}>A</span>

          


          <div className={`nav_auth_container  ${isActive ? "active":""}`}>
          <div className={`${location.pathname==="/yourChannel"?"active":""}`}>
          <button className={`${user&&accessToken?"":"active"}`}><Link to={'/yourChannel'}  >Your Channel</Link></button>
          </div>
            <button onClick={(e)=>{
              
              document.addEventListener("DOMContentLoaded", () => {
                const loginContainers = document.getElementsByClassName("login_container");
                if (loginContainers.length > 0) {
                    loginContainers[0].classList.toggle("active");
                }
            });

            }} className={`${user&&accessToken?"active":""}`}><Link to={'/login'}>Login</Link></button>
            <button onClick={(e)=>{
              
              document.addEventListener("DOMContentLoaded", () => {
                const loginContainers = document.getElementsByClassName("signup_container");
                if (loginContainers.length > 0) {
                    loginContainers[0].classList.toggle("active");
                }
            });
             

            }} className={`${user&&accessToken?"active":""}`}><Link to={'/signup'}  >Sign Up</Link></button>
             <button className={`${user&&accessToken?"":"active"}`} onClick={(e)=>{
              console.log("logout hello");
              if(user){
                dispatch(logout());
                navigate('/');
                
              }

        

            }}><Link to={'/'}  >Logout</Link></button>

          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Navbar;
