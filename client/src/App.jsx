import { useEffect, useState } from 'react';
import './App.css';
import LeftSide_drawer from './components/leftSide/LeftSide_drawer.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import LeftSide from './components/leftSide/LeftSide.jsx';
import Category_Tablist from './components/tablist/Category_Tablist.jsx';
import Item from './components/items/Item.jsx';
import Home_Page from './pages/home_page/Home_page.jsx';
import axios, {isCancel, AxiosError} from 'axios';
import { Outlet } from 'react-router-dom';
function App() {
  // const response=async()=>{
  //   axios.get('/http://localhost:5173').then(res=>{
  //     console.log(res);
  //   }).catch(err=>console.error(err)).finally((a)=>a)
  // }
  const [count, setCount] = useState(0)
  const [res, setRes] = useState([])
  const left_side_active=document.getElementsByClassName("leftSide_drawer_container")[0]


  useEffect(()=>{
    axios.get('/api/').then(res=>{
      setRes(res);
      console.log(res);
    }).catch(err=>console.error(err))
  },[])
  console.log(res);
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
