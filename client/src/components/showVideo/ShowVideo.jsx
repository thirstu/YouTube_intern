import React from 'react';
import "./ShowVideo.css";
import city from '../video/city.mp4';
import vid from '../video/vid.mp4';
import { RxDotsVertical } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
const ShowVideo = ({video}) => {
    
    const navigate=useNavigate();
    // console.log(video);
    return (
        <div onClick={()=>{
            navigate("/playVideo",{state:video})

        }} className='video_container'>
            <video src={video.videoFile} controls className='video_show' >ghost city</video>
        <div className="details">
            <div className='flex'>
                <div className="channel_logo">
                <span>A</span>
                </div>
            <span className='title'> {video.title}</span>
            <RxDotsVertical className='option_dots' />
            </div>
            <span className="channel_name">gon</span>
            <div>
            <span className="views">65k views</span> 
            <span className="date_of_upload">
                6 hours ago
            </span>
            </div>

        </div>
        </div>
  )
}

export default ShowVideo
