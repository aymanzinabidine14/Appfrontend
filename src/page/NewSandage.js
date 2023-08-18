import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDay, faCalendarDays, faDeleteLeft, faTrash, faTree, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from "react-router-dom";

import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";



export const sandageApi=axios.create({
  baseURL:"http://localhost:8080",
  });
  
  
  export const saveEvent=(myoption)=>{
      return sandageApi.post('/saveOption',myoption);
  }
  
  export const saveSandage=(mysandage)=>{
      return sandageApi.post('/saveSandage',mysandage);
  }


function NewSandage() {

const [shouldRedirect, setShouldRedirect] = useState(false);


const [Title, setTitle]=useState('');
const [Description, setDescription]=useState(''); 

const [MyDate, setDate] = useState('');
const [MyTime, setTime] = useState('');
const [selectedTime, setSelectedTime] = useState(''); 

const [Events, setEvents] = useState([]);



const handleRadioChange = (event) => {
    setSelectedTime(event.target.value);
};

const handleDateChange = (event) => {
  setDate(event.target.value);
};

const handleTimeChange = (event) => {
  setTime(event.target.value);
};

const handleTitleChange = (event) => {
  setTitle(event.target.value);
};

const handleDescriptionChange = (event) => {
  setDescription(event.target.value);
};


const handleSubmit = (event) => {
  event.preventDefault();
  if (
    MyDate.trim() !== '' &&
    MyTime.trim() !== '' &&
    selectedTime.trim() !== ''
  ){
    const timeInMinutes = parseInt(selectedTime);
    const currentTime = new Date(`1970-01-01T${MyTime}`);  
    currentTime.setMinutes(currentTime.getMinutes() + timeInMinutes);
    const formattedTime = currentTime.toTimeString().slice(0, 5);
    const newEvent = {
      id:Date.now(),
      date: MyDate,
      time: MyTime,
      endtime:formattedTime,
    
    };

    setEvents([...Events, newEvent]);
    setDate('');
    setTime('');
    setSelectedTime('');
    
  }

};


const handleDeleteEvent= (myvent)=>{
  const newEvents= Events.filter((p) => p.id !== myvent.id);
  setEvents(newEvents);
  }



  const handleSaveSandage= async(event)=>{
    
    event.preventDefault();

    let Sandage={
      titre:Title
    }
    const thesandage= await saveSandage(Sandage);
    const createsandage=thesandage.data;


    const SavedEvents = [];
    Events.map((myevent) => {
    const daySave = {
      date: myevent.date,
      time: myevent.time,
    };
    SavedEvents.push(daySave);
    });

    


    
    
    SavedEvents.map(async(myevent) => (
      myevent.sandage=createsandage,
      await saveEvent(myevent)
      
    ));

    setShouldRedirect(true);

}

if (shouldRedirect) {
  return <Navigate to="/Home" />;
}


const ListEvent = [];
Events.map((myevent) => {
const day = {
  title: "myevent.titre",
  start: myevent.date+"T"+myevent.time,
  end:myevent.date+"T"+myevent.endtime,
};
ListEvent.push(day);
});


  return(
        <div>

<div className="container mt-5">
        <div className="card mx-auto" style={{ width: '60rem' }}>
        <div className="card-body">
        <h2>Groupe pool</h2>
  
  <form>
  <div className="mb-3">
    <label  className="form-label">Title</label>
    <input 
     value={Title} 
     onChange={handleTitleChange}
    type="text" className="form-control"></input>
  </div>
  <div className="mb-3">
    <label  className="form-label">Description (optional)</label>
    <input 
     value={Description} 
     onChange={handleDescriptionChange}
    type="text" className="form-control"></input>
  </div>
  </form>
        </div>
        </div>
    </div>          

<div className="container mt-5">
        <div className="card mx-auto" style={{ width: '60rem',marginBottom: '100px' }}>
        <div class="card-body d-flex flex-row">

        <div class="col-md-6">
            <h2>Add your times</h2>
            <p>Duration :</p>
            <form onSubmit={handleSubmit}>
    
                    <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value="15" onChange={handleRadioChange} />
                        <label className={`btn btn-outline-primary ${selectedTime === '15 min' ? 'active' : ''}`} htmlFor="btnradio1">15 min</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value="30" onChange={handleRadioChange} />
                        <label className={`btn btn-outline-primary ${selectedTime === '30 min' ? 'active' : ''}`} htmlFor="btnradio2">30 min</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" value="60" onChange={handleRadioChange} />
                        <label className={`btn btn-outline-primary ${selectedTime === '60 min' ? 'active' : ''}`} htmlFor="btnradio3">60 min</label>
                    </div>
               
         
<div class="mb-3 col-md-6">
<input 
value={MyDate} 
onChange={handleDateChange}
type="date" className="form-control" ></input></div>
<div class="mb-3 col-md-6">
<input 
value={MyTime} 
onChange={handleTimeChange}
type="time" className="form-control" ></input></div> 
<button type="submit" class="btn btn-primary mb-3">ADD</button>
</form>
</div>

<div class="col-md-5">
<h2>List Options:</h2>

                    <ul class="list-group">

                    {Events.map((myevent,index) => (
                    <li class="list-group-item d-flex justify-content-between align-items-center" key={index}>
                    Date : {myevent.date} - Time : {myevent.time}-{myevent.endtime}
                    <span> <button className="btn btn-danger"onClick={()=>handleDeleteEvent(myevent)} ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></span>
                    </li>
                   ))}
                   </ul>
                </div>

        </div>
        </div>
</div>



<div className="container mt-5">
        <div className="card mx-auto" style={{ width: '60rem' }}>
      
            <div className="card-body">

            <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", 
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={ListEvent}
      />
 

        </div>
        </div>
    </div>

  
    <div class="fixed-bottom fixed-bottom-bar" >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <form onSubmit={handleSaveSandage}>

          <button class="btn btn-success" type="submit">Creer une invitation et continue</button>
    </form>
  </nav>        </div>
        </div>
    )
}
export default NewSandage;





