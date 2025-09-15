import { useEffect, useState } from 'react';
import './App.css';
import LeftSide_drawer from './components/leftSide/LeftSide_drawer.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import LeftSide from './components/leftSide/LeftSide.jsx';
import Category_Tablist from './components/tablist/Category_Tablist.jsx';
import Item from './components/items/Item.jsx';

// import Home_Page from './pages/home_page/Home_page.jsx';
import axios, {isCancel, AxiosError} from 'axios';

import { Outlet } from 'react-router-dom';
import { getAllVideos } from './api/video.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { logout, refreshAccess, setAccessTokenReducer } from './reducers/users.reducer.js';
import Cookies from "js-cookie"
import { allVideos } from './reducers/video.reducer.js';
import { getUserPlays } from './reducers/playlist.reducer.js';

function App() {
  // const response=async()=>{
  //   axios.get('/http://localhost:5173').then(res=>{
  //     console.log(res);
  //   }).catch(err=>console.error(err)).finally((a)=>a)
  // }
  //   const user=useSelector(state=>{
  //   console.log(state);
  //   return state.user;
  // })
  const accessToken=useSelector(state=>{
    console.log(state);
    return state.user?.accessToken
  })
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [res, setRes] = useState([]);
  const left_side_active=document.getElementsByClassName("leftSide_drawer_container")[0];


  useEffect(()=>{
      try {
         // 🔄 Auto refresh access token when the app loads
        //  const token = Cookies.get();
        dispatch(allVideos());
       

        if(accessToken)dispatch(refreshAccess());
        
        if(accessToken){
          setAccessTokenReducer(accessToken);
        }
        
  
         //////////////////////////////////////////
         //////////////////////////////////////////
         //////////////////////////////////////////
      } catch (err) {
        console.error("Failed to refresh token", err);
        dispatch(logout());
      }
 
  },[dispatch])
  // console.log(res);
  return (
    <>
    <div className='app_container'>
    <Navbar/>
    <LeftSide_drawer/>
    <LeftSide/>



      <div className="app_container2">
      {/* <Home_Page/> */}
      <Outlet/>
      
      
      

      </div>
     
     </div>
    </>
  )
}

export default App
