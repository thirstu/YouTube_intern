import React from 'react'
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPauseOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { RxDotsVertical } from "react-icons/rx";
import city from '../../components/video/vid.mp4';


const WatchHistory_Page = () => {
  return (
     <div className="component_container">
      <h1>Watch history</h1>
      <div className="watch_history_page_container">
  
      <div className="left_history_container">
   
  
       <div className="on_day_container">
       <span className="on_which_day_watched">
          {`${'Today'}`}
        </span>
        <div className="video_container">
        <video src={city} className='liked_video'></video>
       <div className="video_details_container">
         <div className="raw1">
         <span className="video_title">Title</span>
         <RxCross1 />
         <RxDotsVertical />
         </div>
         <span>{`${'channel name'} ${'120m' } views`}</span>
         <span className="description">ye video meri nahi hai</span>
       </div>
        </div>
       </div>
      </div>
      {/* //////////////////////////////// */}
      <div className="right_history_container">
        <div className="right_history_search">
          <CiSearch/><input type="text" placeholder='Search watch history' />
        </div>
        <div className="clear_watch_history">
        <RiDeleteBin6Line /> <span>Clear all watch history</span>
        </div>
        <div className="pause_watch_history">
        <IoPauseOutline /> <span>Clear all watch history</span>
        </div>
        <div className="manage_watch_history">
        <IoSettingsOutline /> <span>Clear all watch history</span>
        </div>
        <div className="others">
          <span>Comments</span>
          <span>Posts</span>
          <span>Live chat</span>
        </div>
      
  
      </div>
      </div>
  
    </div>
  )
}

export default WatchHistory_Page
