import React from 'react';
import "./ShowVideo_Grid.css";
import city from '../video/city.mp4';
import ShowVideo from '../showVideo/ShowVideo';

const ShowVideo_Grid = () => {
  return (
    <div className='video_grid_container'>
    <ShowVideo/>
    <ShowVideo/>
    <ShowVideo/>
    <ShowVideo/>
    <ShowVideo/>
    <ShowVideo/>
    </div>
  )
}

export default ShowVideo_Grid
