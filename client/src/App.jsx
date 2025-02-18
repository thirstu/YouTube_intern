import { useState } from 'react';
import './App.css';
import LeftSide_drawer from './components/leftSide/LeftSide_drawer.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import LeftSide from './components/leftSide/LeftSide.jsx';
import Category_Tablist from './components/tablist/Category_Tablist.jsx';
import Item from './components/items/Item.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='app_container'>
      <div className="container2">
      <LeftSide_drawer/>
      <Navbar/>
      <Category_Tablist/>
      <Item/>
      
      
      

      </div>
     
     </div>
    </>
  )
}

export default App
