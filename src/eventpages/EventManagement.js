import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import UpdateEvent from './UpdateEvent';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


function EventManagement() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { IdBooking } = useParams();

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

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    console.log('Select button clicked');
  };

  const handleDeleteEvent = async (event) => {
    const confirmMessage = `Are you sure you want to delete the event "${event.name}"?`;
    const isConfirmed = window.confirm(confirmMessage);

    if (isConfirmed) {
      console.log('Delete button clicked and confirmed');

      try {
        await axios.delete(`http://localhost:8080/deleteBooking/${event.IdBooking}`);
        fetchEvents();
        setSelectedEvent(null);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    } 
    else {
      console.log('Delete button clicked but not confirmed');
    }
  };

 

  return (

    <main id="main" class="main">

<div class="pagetitle">
      <h1>Event Management</h1>
</div> 

    <section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Event List</h5>


    <div className="event-management-container">
      
      <form>
        <Link to="/add">
          <button className="btn btn-success" type="button">
            Create Event
          </button>
        </Link>
      </form>


      <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Event Title</th>
                    <th scope="col">Place</th>
                    <th scope="col">Date</th>
                    <th scope="col">Place</th>
                    <th scope="col">Action</th>



                  </tr>
                </thead>
                <tbody>
                {events.map((event) => (
                  <tr>
                    <td>{event.name}</td>
                    <td>{event.place}</td>
                    <td>{event.date} {event.startHour}</td>
                    <td>{event.placesAvailable}</td>

                    <td>

      <p><button className="btn btn-danger" onClick={()=>handleDeleteEvent(event)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></p>
      <p> <Link to={`/update/${event.IdBooking}`}><button className="btn btn-success"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></Link></p>


      </td>
                  </tr>
                ))}



                  </tbody>
      </table>

     
      
    </div>
    </div>
    </div>
    </div>
    </div></section>
    </main>
  );
}

export default EventManagement;