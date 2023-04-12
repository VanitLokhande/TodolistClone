import React, { useState } from 'react'
import {FaInbox,FaCalendarAlt,FaRegCalendar} from 'react-icons/fa';

const Sidebar = ({selectedtab,setselectedtab}) => {
  console.log(selectedtab);
  
  return (
    <>
      <div className='col-1 bg-white'></div>
      <div className='col-3 bg-danger' id='sidebar'>
         <div className={selectedtab === "Inbox" ? "active" :""} onClick={()=> setselectedtab("Inbox")}><FaInbox className='icon'/>Inbox</div>
         <div className={selectedtab === "Today" ? "active" :""} onClick={()=> setselectedtab("Today")}><FaRegCalendar className='icon'/>Today</div>
         <div className={selectedtab === "Next" ? "active" :""}  onClick={()=> setselectedtab("Next")}><FaCalendarAlt className='icon'/>Next 7 days</div>
      </div>
    
    </>
  )
}

export default Sidebar
