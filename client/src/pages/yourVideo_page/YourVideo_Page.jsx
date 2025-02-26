import React from 'react'
import city from '../../components/video/vid.mp4';
import { LiaDownloadSolid } from 'react-icons/lia';
import { RxDotsVertical } from 'react-icons/rx';

const YourVideo_Page = () => {
  return (
       <div className="component_container">
           <div className="your_videos_page_container">
            <h1>Your Videos</h1>
       
          
       
          
           <div className="right_liked_videos_container">
            
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
             <button className="delete">Delete video</button>
       
             </div>
       
           </div>
           </div>
       
         </div>
  )
}

export default YourVideo_Page
