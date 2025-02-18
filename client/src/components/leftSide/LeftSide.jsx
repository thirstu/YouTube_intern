import React from 'react'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "./LeftSide.css"
const LeftSide = () => {
  return (
    
        <div className="leftSide_container">
      <div className="left_home   left_icon_container ">
        <IoMdHome className='left_icons'/>
        <span>Home</span>

      </div>
      <div className="left_shorts  left_icon_container">
      <SiYoutubeshorts  className='left_icons'/>
        <span>Shorts</span>

      </div>
      <div className="left_subscription  left_icon_container">
      <MdSubscriptions  className='left_icons'/>
        <span>Subscription</span>

      </div>
      <div className="left_profile  left_icon_container">
      <CgProfile className='left_icons' />
        <span>Profile</span>

      </div>

        </div>
  )
}

export default LeftSide
