import React from "react";
import { IoMdHelpCircleOutline, IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineFeedback, MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiGreaterThanBold } from "react-icons/pi";
import { LuHistory } from "react-icons/lu";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { CiYoutube } from "react-icons/ci";
import { BiLike } from "react-icons/bi";
import { MdOutlineContentCut } from "react-icons/md";
import { SiFireship } from "react-icons/si";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { PiFilmSlateDuotone } from "react-icons/pi";
import { IoIosRadio } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdNewspaper } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";
import { GiHanger } from "react-icons/gi";
import { MdPodcasts } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { TbBrandYoutubeKids } from "react-icons/tb";
import { SiYoutubemusic } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFlag } from "react-icons/md";
import "./LeftSide_drawer.css";
import { RxHamburgerMenu } from "react-icons/rx";
import helperTools from "../../helper_tools";
import { Link } from "react-router-dom";
const LeftSide_drawer = () => {

  return (
    <div className="leftSide_drawer_container active">
      <div className="left_logo_burger">
        <div className="nav">
                <RxHamburgerMenu className="icon_burger" onClick={(e)=>helperTools.active(document.getElementsByClassName("leftSide_drawer_container")[0])} />
                <div className="logo">
                  <FaYoutube className="youTube_logo" />
                  <span>YouTube</span>
                </div>
              </div>
      
      </div>
      {/* /////////////////////////////// */}
      <div className="left_block">
        <div className="left_home   left_item_container ">
          <IoMdHome className="left_icons" />
          <span><Link to={`/`}>Home</Link></span>
        </div>
        <div className="left_shorts  left_item_container">
          <SiYoutubeshorts className="left_icons" />
          <span>Shorts</span>
        </div>
        <div className="left_subscription  left_item_container">
          <MdSubscriptions className="left_icons" />
          <span>Subscription</span>
        </div>
      </div>
      {/* /////////////////////////////// */}

      <div className="left_block">
        <div className=" left_item_container">
          <span className="block_title"> <Link to={`/you`}>You</Link></span>
          <PiGreaterThanBold className="greater" />
        </div>
        <div className=" left_item_container">
          <LuHistory className="left_icons" />
          <span className="greater"> <Link to={`/watchHistory`}>History</Link></span>
        </div>
        <div className=" left_item_container">
          <MdOutlinePlaylistPlay className="left_icons" />
          <span className="greater"> <Link to={`/playlist`}>Playlists</Link></span>
        </div>
        <div className=" left_item_container">
          <CiYoutube className="left_icons" />
          <span className="greater"><Link to={`/yourVideo`}>Your Videos</Link> </span>
        </div>
        <div className=" left_item_container">
          <MdOutlineWatchLater className="left_icons" />
          <span className="greater"><Link to={`/watchLater`}>Watch Later</Link>  </span>
        </div>
        <div className=" left_item_container">
          <BiLike className="left_icons" />

          <span className="greater"> <Link to={`/likedVideos`}>Liked Videos</Link></span>
        </div>
        <div className=" left_item_container">
          <MdOutlineContentCut className="left_icons" />
          <span className="greater"> <Link to={`/likedVideos`}>Your Clips</Link></span>
        </div>
      </div>

      {/* /////////////////////////////// */}
{/* 
      <div className="left_block">
        <div className=" left_item_container">
          <span className="block_title"> Subscriptions</span>
        </div>
        <div className=" left_item_container">
          <span className="profile">ab</span>

          <span className="greater"> <Link to={`/likedVideos`}>channel1</Link></span>
        </div>
        <div className=" left_item_container">
          <span className="profile">h</span>

          <span className="greater"><Link to={`/likedVideos`}>channel2</Link> </span>
        </div>
      </div> */}
      {/* /////////////////////////////// */}
      {/* <div className="left_block">
        <div className=" left_item_container">
          <span className="block_title"> Explore</span>
        </div>
        <div className=" left_item_container">
          <SiFireship className="left_icons" />
          <span className="greater">Trending </span>
        </div>
        <div className=" left_item_container">
          <RiShoppingBag4Line className="left_icons" />
          <span className="greater">Shopping </span>
        </div>
        <div className=" left_item_container">
          <IoMusicalNotesOutline className="left_icons" />
          <span className="greater">Music </span>
        </div>
        <div className=" left_item_container">
          <PiFilmSlateDuotone className="left_icons" />
          <span className="greater">Films </span>
        </div>
        <div className=" left_item_container">
          <IoIosRadio className="left_icons" />
          <span className="greater">Live </span>
        </div>
        <div className=" left_item_container">
          <IoGameControllerOutline className="left_icons" />
          <span className="greater">Gaming </span>
        </div>
        <div className=" left_item_container">
          <MdNewspaper className="left_icons" />
          <span className="greater">News </span>
        </div>
        <div className=" left_item_container">
          <IoTrophyOutline className="left_icons" />
          <span className="greater">Sport </span>
        </div>
        <div className=" left_item_container">
          <RiGraduationCapFill className="left_icons" />
          <span className="greater">Courses </span>
        </div>
        <div className=" left_item_container">
          <GiHanger className="left_icons" />

          <span className="greater">Fashion & Beauty </span>
        </div>
        <div className=" left_item_container">
          <MdPodcasts className="left_icons" />

          <span className="greater">Podcasts </span>
        </div>
      </div> */}
      {/* /////////////////////////////// */}
      {/* <div className="left_block">
        <div className=" left_item_container">
          <span className="block_title">More from YouTube</span>
        </div>
        <div className=" left_item_container">
          <FaYoutube className="left_icons" />
          <span className="greater">YouTube Premium </span>
        </div>
        <div className=" left_item_container">
          <SiYoutubestudio className="left_icons" />
          <span className="greater">YouTube Studio </span>
        </div>
        <div className=" left_item_container">
          <SiYoutubemusic className="left_icons" />
          <span className="greater">YouTube Music </span>
        </div>
        <div className=" left_item_container">
          <TbBrandYoutubeKids className="left_icons" />
          <span className="greater">YouTube Kids </span>
        </div>
      </div> */}
      {/* /////////////////////////////// */}
      {/* <div className="left_block">
        <div className=" left_item_container">
          <span className="block_title">Settings</span>
        </div>
        <div className=" left_item_container">
          <IoSettingsOutline className="left_icons" />

          <span className="greater">Settings </span>
        </div>
        <div className=" left_item_container">
          <MdOutlineFlag className="left_icons" />
          <span className="greater">Report History </span>
        </div>
        <div className=" left_item_container">
          <IoMdHelpCircleOutline className="left_icons" />
          <span className="greater">Help </span>
        </div>
        <div className=" left_item_container">
          <MdOutlineFeedback className="left_icons" />
          <span className="greater">Send Feedback </span>
        </div>
      </div> */}
      {/* /////////////////////////////// */}
      <div className="left_block">
        AboutPressCopyrightContact usCreatorAdvertiseDevelopers
        TermsPrivacyPolicy & SafetyHow YouTube worksTest new features © 2025
        Google LLC
      </div>
      {/* /////////////////////////////// */}
    </div>
  );
};

export default LeftSide_drawer;
