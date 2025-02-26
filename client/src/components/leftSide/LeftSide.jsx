import React from 'react'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "./LeftSide.css"
import { Link } from 'react-router-dom';
const LeftSide = () => {
  return (
    
        <div className="leftSide_container">
      <div className="left_home   left_icon_container ">
        <IoMdHome className='left_icons'/>
        <span><Link to={`/`}>Home</Link></span>

      </div>
      <div className="left_shorts  left_icon_container">
      <SiYoutubeshorts  className='left_icons'/>
        <span><Link to={`/`}>Shorts</Link></span>

      </div>
      <div className="left_subscription  left_icon_container">
      <MdSubscriptions  className='left_icons'/>
        <span><Link to={`/`}>Subscription</Link></span>

      </div>
      <div className="left_profile  left_icon_container">
      <CgProfile className='left_icons' />
        <span><Link to={`/`}>Profile</Link></span>

      </div>

        </div>
  )
}

export default LeftSide
