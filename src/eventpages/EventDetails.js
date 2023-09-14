import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EventDetails = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const { idbooking } = useParams();
  const [event, setEvent] = useState(null);
  const [userId, setUserId] = useState(''); // State to store the user ID
  const [bookingStatus, setBookingStatus] = useState('');


  useEffect(() => {
    fetchEventDetails();
  }, [idbooking]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/booking/${idbooking}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };


  useEffect(() => {fetchbookingStatus();}, []);
  const fetchbookingStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/BookByUser/${idbooking}/${user}`);
      setBookingStatus(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleBookNow = async () => {
    try {
      await axios.post(`http://localhost:8080/bookEvent`, null, {
        params: {
          IdBooking: idbooking,
          IdUser: user,
        },
      });
      setBookingStatus('Booking successful');
    } catch (error) {
      console.error('Error booking event:', error);
      setBookingStatus('Booking failed');
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      
<main id="main" class="main">

<div class="pagetitle">
      <h1>Event Details </h1>
</div>

<section class="section">
  <div class="row">
    <div class="col-lg-4">

      <div class="card">
      <img class="card-img-top" src={event.imageFilePath} alt={event.name}></img>
        <div class="card-body">

        <h5 class="card-title">{event.name}</h5>
    <p class="card-text">{event.description}</p>
    <p class="card-text"><small class="text-muted">Date: {event.day} Start Time: {event.startHour} End Time: {event.endHour}</small></p>
    <p class="card-text"><small class="text-muted">Places Available: {event.placesAvailable}</small></p>

    {bookingStatus ?(
    <p class="card-text"><small class="text-muted">Already book it</small></p>
    ):(
    <a class="btn btn-primary"  onClick={handleBookNow}>Book It</a>
    )
    }
       
        </div>
      </div>
      </div>
      </div>
</section>

</main>

    </div>
  );
};

export default EventDetails;
