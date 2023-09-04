// EventUpdateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function UpdateEvent({ selectedEvent, onUpdate }) {
  // Use the selected event's details to initialize state
  const [name, setName] = useState(selectedEvent.name || '');
  const [place, setPlace] = useState(selectedEvent.place || '');
  const [day, setDay] = useState(selectedEvent.day || '');
  const [startHour, setStartHour] = useState(selectedEvent.startHour || '');
  const [endHour, setEndHour] = useState(selectedEvent.endHour || '');
  const [description, setDescription] = useState(selectedEvent.description || '');
  const [placesAvailable, setPlacesAvailable] = useState(selectedEvent.placesAvailable || '');
  const [imageFilePath, setImageFilePath] = useState(selectedEvent.imageFilePath || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updates = {
        name,
        place,
        day,
        startHour,
        endHour,
        description,
        placesAvailable,
        imageFilePath,
      };
  
      console.log('Updates:', updates);
      const url = `http://localhost:8080/update/${selectedEvent.idBooking}`;
      console.log('Request URL:', url);
  
      await axios.patch(url, updates);
  
      onUpdate();
      alert('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event');
    }
  };
  
  

  return (
    <div>
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Place:</label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
        </div>
        <div>
          <label>Day:</label>
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
        </div>
        <div>
          <label>Start Hour:</label>
          <input type="time" value={startHour} onChange={(e) => setStartHour(e.target.value)} />
        </div>
        <div>
          <label>End Hour:</label>
          <input type="time" value={endHour} onChange={(e) => setEndHour(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Places Available:</label>
          <input type="number" value={placesAvailable} onChange={(e) => setPlacesAvailable(e.target.value)} />
        </div>
        <div>
          <label>Image File Path:</label>
          <input type="text" value={imageFilePath} onChange={(e) => setImageFilePath(e.target.value)} />
        </div>
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default UpdateEvent;
