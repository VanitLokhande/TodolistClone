import React from 'react'
import Sidebar from './Sidebar';
import Tasks from './Tasks';
import { useState } from 'react';

const Content = () => {
  const[selectedtab , setselectedtab] =useState("Inbox");
  return (
   <>
   <div className='row bg-primary' id='con'>
     <Sidebar selectedtab={selectedtab} setselectedtab={setselectedtab}/>
     <Tasks selectedtab={selectedtab}/>
        
   </div>
   
   </>
  )
}

export default Content
