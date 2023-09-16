import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventList() {

  const user = JSON.parse(localStorage.getItem('user'));
  
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookings');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (

  <div>
    
    <main id="main" class="main">

<div class="pagetitle">
      <h1>List Event</h1>
</div>


  <div class="row row-cols-1 row-cols-md-3 g-4">
  {events.map(event => (
  <Link to={`/event/${event.IdBooking}`} key={event.IdBooking}>

  <div class="col">
    <div class="card">
      <img src={event.imageFilePath} class="card-img-top" alt="Event"></img>
      <div class="card-body">
       
        <h5 class="card-title">{event.name}</h5>

        <a href={`/event/${event.IdBooking}`} class="btn btn-success">Plus</a>

      </div>
    </div>
  </div>

  </Link>

  ))}
  </div>

  </main>
    </div>
  );
}

export default EventList;
