import React, { useEffect, useState } from "react";
import city from "../../components/video/vid.mp4";
import { RxDotsVertical } from "react-icons/rx";
import "./Channel_Page.css";
import { deleteVid, usersAllVideos } from "../../reducers/video.reducer";
import { getUserPlays } from "../../reducers/playlist.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import VideoUploadAndEdit_Page from "../video_upload_and_edit_page/VideoUploadAndEdit_Page";

const Channel_Page = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { channelVideos } = useSelector((state) => state.videos);
  const { accessToken } = useSelector((state) => state.user);
  const [section, setSection] = useState("videos");

  const dispatch = useDispatch();
  console.log(channelVideos);
  console.log(channelVideos.data);


  useEffect(() => {
    if (location.pathname === "/yourChannel" && accessToken) {
      dispatch(getUserPlays());
      dispatch(usersAllVideos());
    }
  }, [dispatch, accessToken, location.pathname]);
   const handleDelete = (videoId) => {
          
         
  
         
  
          if (accessToken) {
             
              dispatch(deleteVid(videoId));
          } 
      };

  return (
    <div className="app_container2">
      <div className="component_container">
        <div className="channel_container">
          {/* Channel Profile Section */}
          <div className="channel_profile_section">
            <div className="channel_profile">img</div>
            <div className="channel_details">
              <h2 className="name">Ajay Nishad</h2>
              <span className="channel_id">@fjhdsfk4585</span>
              <p className="channel_description">
                More about this channel... <span className="more">more</span>
              </p>
              <div className="btns">
                <button className="customize_btn">Customize Channel</button>
                <button className="manage_btn">Manage Videos</button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="navigate_sections">
            <div onClick={() => setSection("videos")}>Videos</div>
            <div onClick={() => setSection("playlist")}>Playlist</div>
          </div>

          {/* Channel Content Section */}
          <div className="channel_content_section">
            {/* User Videos Section */}
            {section === "videos" && (
              <div className="channel_section ">
                <h3>Created Videos</h3>
                <div className="video_list">
                  {channelVideos?.data?.map((video) => {
                    console.log(video);

                    return (
                      <div key={video._id} className="video_card">
                        {/* Video & Details on Left */}
                        <div className="video_left">
                          <video
                            src={video?.videoFile}
                            className="video"
                            controls
                          ></video>
                          <div className="video_details">
                            <h4 className="video_title">{video.title} </h4>
                            <div className="video_meta">
                              <span className="channel_name">Channel</span>
                              <span className="video_views">{` ${video.views} views`}</span>
                              <span className="upload_date">
                                {`${video.createdAt} ago`}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Edit & Remove on Right */}
                        <div className="video_right">
                          <button
                            className="edit_btn"
                            onClick={() => {
                              console.log(video);
                              navigate("/uploadAndEdit", {
                                state: { editingVideo: video },
                              });
                            }}
                          >
                            Edit
                          </button>
                          <div className="relative inline-block">
                            {!showConfirm ? (
                              <button
                                className="remove_btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                onClick={() => setShowConfirm(true)}
                              >
                                Remove
                              </button>
                            ) : (
                              <div className="absolute mt-2 bg-white p-2 border rounded shadow-md">
                                <p className="text-sm font-medium">
                                  Are you sure?
                                </p>
                                <div className="flex gap-2 mt-2">
                                  <button
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                    onClick={() => {
                                      handleDelete(video._id); // Call your delete function
                                      setShowConfirm(false);
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                                    onClick={() => setShowConfirm(false)}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Playlist Section */}
            {section === "playlist" && (
              <div className="channel_section ">
                <h3>Playlists</h3>
                <div className="playlist_list">
                  <div className="playlist_card">
                    {/* Playlist Thumbnail & Details on Left */}
                    <div className="playlist_left">
                      <div className="playlist_thumbnail">Thumbnail</div>
                      <div className="playlist_details">
                        <h4 className="playlist_title">My Favorite Videos</h4>
                        <span className="playlist_count">5 videos</span>
                      </div>
                    </div>
                    {/* Edit & Remove on Right */}
                    <div className="playlist_right">
                      <button className="edit_btn">Edit</button>
                      <button className="remove_btn">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel_Page;
