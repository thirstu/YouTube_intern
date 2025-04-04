import React, { useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import "./Video_Card.css";
function Video_Card({video}) {
  console.log(video);
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div key={video._id} className="video_card">
        {/* Video & Details on Left */}
        <div className="video_left">
          <video src={video?.videoFile} className="video" controls></video>
          <div className="video_details">
            <h4 className="video_title">{video.title}</h4>
            <div className="video_meta">
              <span className="channel_name">Channel</span>
              <span className="video_views">{`${video.views} views`}</span>
              <span className="upload_date">{`${video.createdAt} ago`}</span>
            </div>
          </div>
        </div>
  
        {/* Three-dot menu for options */}
        <div className="video_options">
          <RxDotsVertical
            className="dots_icon"
            onClick={() => setShowOptions(!showOptions)}
          />
          {showOptions && (
            <div className="options_menu">
              <button className="option_btn">Save to Playlist</button>
            </div>
          )}
        </div>
      </div>
    );
}

export default Video_Card