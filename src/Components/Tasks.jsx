import React, { useEffect, useState } from 'react'



import dateFnsFormat from 'date-fns/format'

import Datepicker from 'react-datepicker';

import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

const FORMAT = "dd/MM/yyyy";
function formateDate(date, format, local){
  return dateFnsFormat(date,format,{local})
}

const Addtask=({onCancel,onAddtask})=>{
  const [task , settask]=useState("");
  const [date , setdate]=useState(null);
  console.log(task);
  console.log("date===",date);

  return(
    <div className='add-task-dilog'>
          <input value={task} onChange={(event)=>settask(event.target.value)}/>
          <div className='add-tasks-action-container'>
            <div className='btn-container'>
              <button disabled={!task} onClick={()=>{
                onAddtask(task,date)
                settask("");
                onCancel();
                }} className='btn btn-info'  id='add-task'>Add Task</button>
              <button id='cancel-task' onClick={()=>{ 
                onCancel()
              settask("");
              }}>Cancel</button>
            </div>
            <div className='icon-contaier'>
              <Datepicker selected={date} onChange={(data)=>{setdate(data)}} dateFormate="dd/MM/yyyy" minDate={new Date()}/>
            </div>
            
          </div>
        </div>
  );
};

const TASKS_HEADER_MAPPING ={
  Inbox:"Input",
  Today:"Today",
  Next:"Next 7 Days",
};

const TaskItems=({selectedtab, tasks})=>{
  let tasksrender= [...tasks];
  if(selectedtab === "Next"){
    tasksrender= tasksrender.filter(
      (task)=>isAfter(task.date, new Date()) &&
      isBefore(task.date, addDays(new Date() , 7))
    );
  }

  if(selectedtab === "Today"){
    tasksrender=tasksrender.filter(
      (task)=>isToday(task.date)
    );
  }
  return(
    <div className='tasks-item-container'>{ tasksrender.map((task)=>(
      <div className='tasks-item'>
        <p>{task.text}</p>
        <p>{dateFnsFormat(new Date(task.date), FORMAT) }</p>
      </div>
    
  ))}
  </div>

  )

}

const Tasks = ({selectedtab}) => {
  const [showaddtask, setshowaddtask] = useState(false);
  const [tasks , settasks] =useState([]);


  console.log(showaddtask);
  const addnewtask=(text, date)=>{
    const newtaskitem={text , date: date || new Date()}
    settasks([...tasks, newtaskitem]);
    console.log(text);

  }
  return (
    <>
    <div className='col-7' id='tasks'>
        <h1>{TASKS_HEADER_MAPPING[selectedtab]}</h1>
        {selectedtab=== "Inbox" ?<div className='addTask' onClick={()=> setshowaddtask(!showaddtask)}>
          <span className='plus'>+</span>
          <span className='addtask'>Add task</span>
        </div> : null}
       {showaddtask && <Addtask onAddtask={addnewtask} onCancel={()=>setshowaddtask(false)}/>}

       {tasks.length > 0 ?
       <TaskItems selectedtab={selectedtab} tasks={tasks}/>:<p>No Task Yet</p>}
        
    </div>
    <div className='col-1 bg-white'></div>
    
    </>
  )
}

export default Tasks
