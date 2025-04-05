import React from 'react';
import "./ShowVideo_Grid.css";
// import city from '../video/city.mp4';
import ShowVideo from '../showVideo/ShowVideo';

const ShowVideo_Grid = ({videos}) => {
  // console.log(new Date().getMinutes());
  const videosDisplay=videos?.map(video=>{
    // console.log(video);
    return <ShowVideo  video={video}/>;
  })
  // console.log(videosDisplay);

  return (
    <div className='video_grid_container'>
    
    {videos?.length > 0 ?videos?.map(video=>{
    // console.log(video);
    return <ShowVideo key={video.createdAt}  video={video}/>;
  }):(
    <p>No videos available.</p> // ✅ Show message when no videos
  )}
    </div>
  )
}

export default ShowVideo_Grid
