import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineDotsVertical } from "react-icons/hi";
import './You_Page.css';
const You_Page = () => {
  return (
   <div className="component_container">
            <div className="you_page_container">
              <div className="you_profile_container">
                <img src="" alt="" />
                <div className="you_details">
                  <h1 className="you_user_name">Ajay Nishad</h1>
                  <span className="you_channel_details">{`${'channel name'}`}<Link>View channel</Link></span>
                  <div className="btns">
                    <button><CgProfile />Switch account</button>
                    <button><FaGoogle />Google account</button>
                  </div>
                </div>
              </div>
              {/* ////////////////////////// */}
              <div className="you_history_container">
              <div className="first_raw">
                  <div className="first_raw_left">
                    <h1>History</h1>
                    <span>Recently added <IoIosArrowDown /></span>
                  </div>
                  <div className="first_raw_right">
                  <AiOutlinePlus />
                    <button>View all</button>
                  </div>

                </div>
                <div className="second_raw">
                  <div className="you_playlist_video">
                    <video src={city}></video>
                    <div className="two_sides">
                      <span className="title">liked videos</span><HiOutlineDotsVertical />

                    </div>
                    <div className="video_details">
                      <span>{`${'Private'} ${'Playlist'}`}</span>
                      <span>{`${'52'}m views ${'3'} months ago`}</span>

                    </div>
                  </div>
                </div>
                history
              </div>
              {/* ////////////////////////// */}
              <div className="you_playlist_container">
                <div className="first_raw">
                  <div className="first_raw_left">
                    <h1>Playlist</h1>
                    <span>Recently added <IoIosArrowDown /></span>
                  </div>
                  <div className="first_raw_right">
                  <AiOutlinePlus />
                    <button>View all</button>
                  </div>

                </div>
                <div className="second_raw">
                  <div className="you_playlist_video">
                    <video src={city}></video>
                    <div className="two_sides">
                      <span className="title">liked videos</span><HiOutlineDotsVertical />

                    </div>
                    <div className="video_details">
                      <span>{`${'Private'} ${'Playlist'}`}</span>
                      <span>{`${'52'}m views ${'3'} months ago`}</span>

                    </div>
                  </div>
                </div>

               

                playlist
              </div>
              {/* ////////////////////////// */}
              <div className="you_history_container">
              <div className="first_raw">
                  <div className="first_raw_left">
                    <h1>Watch Later</h1>
                    <span>Recently added <IoIosArrowDown /></span>
                  </div>
                  <div className="first_raw_right">
                  <AiOutlinePlus />
                    <button>View all</button>
                  </div>

                </div>
                <div className="second_raw">
                  <div className="you_playlist_video">
                    <video src={city}></video>
                    <div className="two_sides">
                      <span className="title">liked videos</span><HiOutlineDotsVertical />

                    </div>
                    <div className="video_details">
                      <span>{`${'Private'} ${'Playlist'}`}</span>
                      <span>{`${'52'}m views ${'3'} months ago`}</span>

                    </div>
                  </div>
                </div>
                watch later
              </div>
              {/* ////////////////////////// */}
              <div className="you_history_container">
              <div className="first_raw">
                  <div className="first_raw_left">
                    <h1>Liked Videos</h1>
                    <span>Recently added <IoIosArrowDown /></span>
                  </div>
                  <div className="first_raw_right">
                  <AiOutlinePlus />
                    <button>View all</button>
                  </div>

                </div>
                <div className="second_raw">
                  <div className="you_playlist_video">
                    <video src={city}></video>
                    <div className="two_sides">
                      <span className="title">liked videos</span><HiOutlineDotsVertical />

                    </div>
                    <div className="video_details">
                      <span>{`${'Private'} ${'Playlist'}`}</span>
                      <span>{`${'52'}m views ${'3'} months ago`}</span>

                    </div>
                  </div>
                </div>
                liked videos
              </div>
              {/* ////////////////////////// */}
              <div className="you_history_container">
              <div className="first_raw">
                  <div className="first_raw_left">
                    <h1>Your Clip</h1>
                    <span>Recently added <IoIosArrowDown /></span>
                  </div>
                  <div className="first_raw_right">
                  <AiOutlinePlus />
                    <button>View all</button>
                  </div>

                </div>
                <div className="second_raw">
                  <div className="you_playlist_video">
                    <video src={city}></video>
                    <div className="two_sides">
                      <span className="title">liked videos</span><HiOutlineDotsVertical />

                    </div>
                    <div className="video_details">
                      <span>{`${'Private'} ${'Playlist'}`}</span>
                      <span>{`${'52'}m views ${'3'} months ago`}</span>

                    </div>
                  </div>
                </div>
                your clip
              </div>
              {/* ////////////////////////// */}



            </div>
          </div>
  )
}

export default You_Page
