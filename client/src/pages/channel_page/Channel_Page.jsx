import React from "react";
import city from "../../components/video/vid.mp4";
import { RxDotsVertical } from "react-icons/rx";

const Channel_Page = () => {
  return (
    <div className="app_container2">
      <div className="component_container">
       <div className="channel_container">
       <div className="channel_profile_container">
          <div className="channel_profile">img</div>
          <div className="channel_details">
            <span className="name">Ajay Nishad</span>
            <span className="channel_id">@fjhdsfk4585</span>
            <span>More about this channel ...more</span>
            <div className="btns">
              <button>Customize channel</button>
              <button>Manage videos</button>
            </div>

          </div>
        </div>
        <div className="channel_video_container">
          <div className="first_raw">
            <span>Created Videos</span>
            <span>Sort by</span>
          </div>
          <div className="second_raw">
            <div className="liked_video_container">
              <span className="video_index">1</span>
              <video src={city} className="liked_video"></video>
              <div className="liked_video_details_container">
                <div className="title">hello bhai</div>
                <div>
                  <span className="channel_name">channel</span>
                  <span className="video_views">{`${"44m"} views`}</span>
                  <span className="date_of_upload">{`${"11"} months ago`}</span>
                </div>
              </div>
              <RxDotsVertical />
            </div>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Channel_Page;
