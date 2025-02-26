import React from 'react';
import "./Category_Tablist.css"

const Category_Tablist = () => {

  const tab_category=[
    "All","Music","java","Sports","Football","Games","Entertainment","Economy","Wild Life","Science","Food",
  ]
  return (
    <div className="category_tablist">
      {tab_category.map(category=>(<span className='category' key={category}>{`${category}`}</span>))}
    </div>
  )
}

export default Category_Tablist
