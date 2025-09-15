import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Home_page.css';
import ShowVideo_Grid from '../../components/videoGrid/ShowVideo_Grid';
import Category_Tablist from '../../components/tablist/Category_Tablist';
import  {allVideos } from "../../reducers/video.reducer.js";
import { getUserPlays } from "../../reducers/playlist.reducer.js";

// import { getAllVideos } from '../../api/video.api.js';
const Home_Page = () => {
  const {accessToken}=useSelector(state=>{
    console.log(state);
    return state.user
  })
  const dispatch=useDispatch();
  const {allChannelsVideos:videos,status,error}=useSelector((state)=>{
    console.log(state);
    return state.videos
  })

  useEffect(()=>{
     if(accessToken){
              dispatch(getUserPlays());
              dispatch(allVideos());
            }
    //Fetch videos on mount  
  },[dispatch])

  if(status==="loading")return <p>Loading...</p>
  if(status==="failed")return <p>Error:{error}</p>
  console.log(videos.data);
  return (
    <div className='app_container2'>
      <Category_Tablist/>

      <div className="component_container">
        
        <ShowVideo_Grid videos={videos?.data}/>

      </div>
    </div>
  )
}

export default Home_Page
