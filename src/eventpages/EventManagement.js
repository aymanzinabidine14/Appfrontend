import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import UpdateEvent from './UpdateEvent';


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
        await axios.delete(`http://localhost:8080/delete/${event.idBooking}`);
        fetchEvents();
        setSelectedEvent(null);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    } else {
      console.log('Delete button clicked but not confirmed');
    }
  };

  const handleEventUpdate = () => {
    fetchEvents();
    setSelectedEvent(null);
  };

  return (
    <div className="event-management-container">
      <h1 className="page-title">Event Management</h1>
      <form>
        <Link to="/add">
          <button className="create-event-button" type="button">
            Create Event
          </button>
        </Link>
      </form>

      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            {event.name}
            <button
              className="update-button"
              type="button"
              onClick={() => handleEventSelect(event)}
            >
              Update
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={() => handleDeleteEvent(event)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <div>
          <UpdateEvent selectedEvent={selectedEvent} onUpdate={() => handleEventUpdate()} />
          
        </div>
      )}
    </div>
  );
}

export default EventManagement;