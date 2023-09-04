import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventList() {
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
      <div className="card-grid">
        {events.map(event => (
          <Link to={`/event/${event.IdBooking}`} key={event.IdBooking}>
            {/* Use Link to navigate to event details with event ID */}
            <div className="card" style={{ width: '20rem', height: '31rem' }}>
              <img src={event.imageFilePath} className="card-img-top" style={{ width: '320px', height: '200px', overflow: 'hidden' }} alt="Event" />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <br></br>
                <a href="#" className="btn btn-primary">
                  Book Now
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventList;
