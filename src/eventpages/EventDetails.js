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
      const response = await axios.get(`http://localhost:8080/event/${idbooking}`);
      setEvent(response.data);
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
      <h2>{event.name}</h2>
      <img src={event.imageFilePath} alt={event.name} />
      <p>Description: {event.description}</p>
      <p>Date: {event.day}</p>
      <p>Start Time: {event.startHour}</p>
      <p>End Time: {event.endHour}</p>
      <p>Places Available: {event.placesAvailable}</p>

      <div>
        
        <button className="btn btn-primary" onClick={handleBookNow}>
          Book Now
        </button>
        <p>{bookingStatus}</p>
      </div>

      <Link to="/eventList">Back to Event List</Link>
    </div>
  );
};

export default EventDetails;
