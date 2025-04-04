import React, { useState } from "react";
import { RxDotsVertical } from "react-icons/rx";

function Playlist_Card({playlist}) {
  console.log(playlist);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div key={playlist._id} className="playlist_card">
      {/* Left Section: Thumbnail & Details */}
      <div className="playlist_left">
        <div className="playlist_thumbnail">Thumbnail</div>
        <div className="playlist_details">
          <h4 className="playlist_title">{playlist.title}</h4>
          <span className="playlist_count">{playlist.videoCount} videos</span>
        </div>
      </div>

      {/* Right Section: Three-dot Menu */}
      <div className="playlist_options">
        <RxDotsVertical
          className="dots_icon"
          onClick={() => setShowOptions(!showOptions)}
        />
        {showOptions && (
          <div className="options_menu">
            <button className="option_btn">Delete Playlist</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlist_Card