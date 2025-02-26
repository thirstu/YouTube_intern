import React from 'react'
import city from '../../components/video/vid.mp4';
import { LiaDownloadSolid } from 'react-icons/lia';
import { RxDotsVertical } from 'react-icons/rx';

const WatchLater_Page = () => {
  return (
    <div className="component_container">
       <div className="liked_videos_page_container">
   
       <div className="left_liked_profile_container">
       <video src={city} className='liked_video'></video>
   
        <div className="left_video_details">
         <span className="title">Liked Videos</span>
         <div className="user_and_details">
           <span className="userName">Name</span>
           <span className="videos_detail">
             {`${"24" } videos ${`No views`} Updated ${`Monday`}`}
           </span>
   
         </div>
         <LiaDownloadSolid />
        </div>
        <div className="btns">
         <button>Play all</button>
         <button>Shuffle</button>
        </div>
       </div>
   
       {/* //////////////////////////////// */}
       <div className="right_liked_videos_container">
         <div className="liked_videos_nav">
           <span>All</span>
           <span>Videos</span>
           <span>Shorts</span>
         </div>
         <div className="liked_video_container">
           <span className="video_index">
             1
           </span>
         <video src={city} className='liked_video'></video>
         <div className="liked_video_details_container">
           <div className="title">hello bhai</div>
           <div>
             <span className="channel_name">channel</span>
             <span className="video_views">
               {`${'44m'} views`}
             </span>
             <span className="date_of_upload">
               {`${'11'} months ago`}
             </span>
           </div>
         </div>
       < RxDotsVertical />
   
   
         
   
           
         </div>
       {/* <ShowVideo_Grid/> */}
   
       </div>
       </div>
   
     </div>
  )
}

export default WatchLater_Page
