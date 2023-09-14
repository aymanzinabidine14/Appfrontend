import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import '../assets/css/style.css';
import { useParams,Navigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";



export const sandageApi=axios.create({
  baseURL:"http://localhost:8080",
  });
  

  export const BookingUpdate=(booking,id)=>{
    return sandageApi.post(`/updateBooking/${id}`,booking);
  }
  


function UpdateEvent() {

  const { id } = useParams();

  const [shouldRedirect, setShouldRedirect] = useState(false);


  const[name,setName]=useState('');
  const[place,setPlace]=useState('');
  const[date,setDate]=useState('');
  const[starth,setStarth]=useState('');
  const[endh,setEndh]=useState('');
  const[description,setDescription]=useState('');
  const[nombreplace,setNombreplace]=useState('');
  const[image,setImage]=useState('');


  const handlenameChange = (event) => {
    setName(event.target.value);
  };
  const handleplaceChange = (event) => {
    setPlace(event.target.value);
  };
  const handledateChange = (event) => {
    setDate(event.target.value);
  };
  const handlestarthChange = (event) => {
    setStarth(event.target.value);
  };
  const handleendhChange = (event) => {
    setEndh(event.target.value);
  };
  const handledescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlenombreplaceChange = (event) => {
    setNombreplace(event.target.value);
  };
  const handleimageChange = (event) => {
    setImage(event.target.value);
  };
  

useEffect(() => { loadBooking();},[]);
const loadBooking =()=>{
    axios.get(`http://localhost:8080/booking/${id}`)
    .then(resp=>{
      const booking=resp.data;
      setName(booking.name);
      setPlace(booking.place);
      setDate(booking.day);
      setStarth(booking.startHour);
      setEndh(booking.endHour);
      setDescription(booking.description);
      setNombreplace(booking.placesAvailable);
      setImage(booking.imageFilePath);
})
};


  const handlesubmit=async()=>{
    const updatevalues = {
      name: name,
      place:place,
      day: date,
      startHour:starth,
      endHour:endh,
      description:description ,
      placesAvailable:nombreplace ,
      imageFilePath:image,
    };


    console.log(updatevalues);
    BookingUpdate(updatevalues,id);
    //window.location.reload();          
  
    setShouldRedirect(true);

}

if (shouldRedirect) {
  return <Navigate to="/eventManagement" />;
}





  return(
   
    <main id="main" class="main">

<div class="pagetitle">
      <h1>Update Events</h1>
</div> 



<section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Event Details</h5>

              <form onSubmit={handlesubmit} >
                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-5 col-form-label">Name</label>
                      <div className="col-md-4 col-lg-9">
                        <input name="fullName" type="text" className="form-control"
                        value={name} 
                        onChange={handlenameChange}
                     
                         />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-5 col-form-label">Place</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="email" type="text" className="form-control" 
                        value={place}
                        onChange={handleplaceChange}
                      
            
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-2 col-lg-5 col-form-label">Date</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="date" className="form-control" 
                        value={date}
                        onChange={handledateChange}


                       
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-2 col-lg-5 col-form-label">Start time</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="time" className="form-control" 
                        value={starth}
                        onChange={handlestarthChange}

                       
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-2 col-lg-5 col-form-label">End Time</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="time" className="form-control" 
                        value={endh}
                        onChange={handleendhChange}

                       
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-2 col-lg-5 col-form-label">Description</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="textarea" className="form-control" 
                        value={description}
                        onChange={handledescriptionChange}

                       
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-2 col-lg-5 col-form-label"> Places Available</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="text" className="form-control" 
                        value={nombreplace}
                        onChange={handlenombreplaceChange}

                       
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-2 col-lg-5 col-form-label">Image File Path</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="text" className="form-control" 
                        value={image}
                        onChange={handleimageChange}
                       
                        />
                      </div>
                    </div>

                    

                    <div className="row mb-3">
                    <div className="col-md-8 col-lg-3">
                      <button type="submit" className="btn btn-primary">Update</button>
                      </div>
                    </div>
                  </form>







              </div>
              </div>
              </div>
              </div>
            </section>
            </main>
  )


}



export default UpdateEvent;
