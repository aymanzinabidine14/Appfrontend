import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDay, faCalendarDays, faDeleteLeft, faTrash, faTree, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Navigate,useParams} from "react-router-dom";

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
  
  export const sandageUpdate=(mysandage,idsandage)=>{
      return sandageApi.post(`/UpdateSandage/${idsandage}`,mysandage);
  }

function UpdateSandage() {

const {id} = useParams();

const [shouldRedirect, setShouldRedirect] = useState(false);


const [Title, setTitle]=useState('');
const [Description, setDescription]=useState(''); 
const [MyDate, setDate] = useState('');
const [MyTime, setTime] = useState('');
const [selectedTime, setSelectedTime] = useState(''); 
const [Events, setEvents] = useState([]);
const [Newvents,setNewEvents]=useState([]);

const [SandageInfo,setSandageInfo]=useState('');

const [Eventpoursupprimer,setEventpoursupprimer]=useState([]);

useEffect(() => { loadSandage();},[]);
const loadSandage =()=>{
    axios.get(`http://localhost:8080/sandage/${id}`)
    .then(resp=>{
      const sandage=resp.data;
      setSandageInfo(sandage);
      setTitle(sandage.titre);
      setEvents(sandage.options);
      setDescription(sandage.description)
})
};

const deleteOption = async (idOption) => {await axios.delete(`http://localhost:8080/deleteOptionById/${idOption}`);};


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
      endTime:formattedTime,
    };
    setNewEvents([...Newvents, newEvent]);
    setDate('');
    setTime('');
    //setSelectedTime('');
  }

};


const handleDeleteEvent= (myvent)=>{
setEventpoursupprimer([...Eventpoursupprimer, myvent]);
const newEvents= Events.filter((p) => p.idDate !== myvent.idDate);
setEvents(newEvents);
}



const handleDeleteNewEvent= (myvent)=>{
  const newEvents= Newvents.filter((p) => p.id !== myvent.id);
  setNewEvents(newEvents);
  }
  


const handleSaveSandage= async(event)=>{
    event.preventDefault();


    const SavedEvents = [];
    Newvents.map((myevent) => {
    const daySave = {
      date: myevent.date,
      time: myevent.time,
      endTime:myevent.endTime
    };
    SavedEvents.push(daySave);
    });


    SavedEvents.map(async(myevent) => (
      myevent.sandage=SandageInfo,
      await saveEvent(myevent)

    ));

    let Sandage={
      titre:Title,
      description:Description
    }
    

    Eventpoursupprimer.map(async(theEvent)=>(
      deleteOption(theEvent.idDate)
    ));

    console.log(Eventpoursupprimer);
  
    await sandageUpdate(Sandage,id);

   setShouldRedirect(true);

}

if (shouldRedirect) {
  return <Navigate to="/Home" />;
}





  return(
        <div>

        
  <main id="main" class="main">

  <div class="card-body d-flex align-items-center">

<div class="pagetitle">
  <h1>Update group poll</h1>


</div>

<form onSubmit={handleSaveSandage} class="mx-5">
<button class="btn btn-success" type="submit">Update</button>
</form>

</div>


<section class="section">
  <div class="row">
    <div class="col-lg-6">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Update group poll</h5>

          <form class="row g-3">
           
            <div class="col-12">
              <label for="inputNanme4" class="form-label">Title</label>
              <input value={Title} onChange={handleTitleChange} 
              type="text" className="form-control"></input>            
              </div>
            
            <div class="col-12">
              <label for="inputEmail4" class="form-label">Description</label>
              <textarea value={Description} 
              onChange={handleDescriptionChange}
              type="text" className="form-control"></textarea>
            </div>
            
          </form>
       
        </div>
      </div>


   

    </div>

    <div class="col-lg-6">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Add your times</h5>
          <p >Duration</p>
          <form class="row g-3" onSubmit={handleSubmit}>


            <div class="col-md-12">

            <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value="15" onChange={handleRadioChange} />
                        <label className={`btn btn-outline-primary ${selectedTime === '15 min' ? 'active' : ''}`} htmlFor="btnradio1">15 min</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value="30" onChange={handleRadioChange} />
                        <label className={`btn btn-outline-primary ${selectedTime === '30 min' ? 'active' : ''}`} htmlFor="btnradio2">30 min</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" value="60" onChange={handleRadioChange} />
                        <label className={`btn btn-outline-primary ${selectedTime === '60 min' ? 'active' : ''}`} htmlFor="btnradio3">60 min</label>
                    </div>
            </div>

            <div class="col-md-6">
                <input 
                value={MyDate} 
                onChange={handleDateChange}
                type="date" className="form-control"
                ></input>
            </div>

            <div class="col-md-6">
                <input 
                value={MyTime} 
                onChange={handleTimeChange}
                type="time" className="form-control">
                </input>
            </div>
           
          
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Add</button>
            </div>
          </form>

         
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Options</h5>

          <table class="table">
<thead>
<tr>
  <th scope="col">Date</th>
  <th scope="col">Start Time</th>
  <th scope="col">End Time</th>
  <th scope="col"></th>

</tr>
</thead>
<tbody>
{Events.map((myevent) => (

<tr>
  <td>{myevent.date}</td>
  <td>{myevent.time}</td>
  <td>{myevent.endTime}</td>
  <td><button className="btn btn-danger"onClick={()=>handleDeleteEvent(myevent)} ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></td>
</tr>

))}


{Newvents.map((myevent) => (

<tr>
  <td>{myevent.date}</td>
  <td>{myevent.time}</td>
  <td>{myevent.endTime}</td>
  <td><button className="btn btn-danger"onClick={()=>handleDeleteEvent(myevent)} ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></td>
</tr>

))}

</tbody>
</table>

         
        </div>
      </div>

   

    </div>
  </div>
</section>

</main>
        </div>
    )
}
export default UpdateSandage;





