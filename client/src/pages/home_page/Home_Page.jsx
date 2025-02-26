import React from 'react';
import './Home_page.css';
import ShowVideo_Grid from '../../components/videoGrid/ShowVideo_Grid';
import Category_Tablist from '../../components/tablist/Category_Tablist';
const Home_Page = () => {
  return (
    <div className='app_container2'>
      <Category_Tablist/>

      <div className="component_container">
        
        <ShowVideo_Grid/>

      </div>
    </div>
  )
}

export default Home_Page
