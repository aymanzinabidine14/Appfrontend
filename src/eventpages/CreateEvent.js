import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';
import React, { useState ,useEffect} from 'react';



const BookingForm = () => {

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const initialValues = {
    name: '',
    place: '',
    day: '',
    startHour: '',
    endHour: '',
    description: '',
    placesAvailable: '',
    imageFilePath: '',
  };


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    place: Yup.string().required('Place is required'),
    day: Yup.date().required('Date is required'),
    startHour: Yup.string().required('Start Hour is required'),
    endHour: Yup.string().required('End Hour is required'),
    description: Yup.string(),
    placesAvailable: Yup.number()
      .required('Places Available is required')
      .positive('Places Available must be a positive number')
      .integer('Places Available must be an integer'),
    imageFilePath: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Format startHour and endHour to match server expectations
      const formattedValues = {
        ...values,
        startHour: new Date(`01/01/1970 ${values.startHour}`).toISOString().substring(11, 19),
        endHour: new Date(`01/01/1970 ${values.endHour}`).toISOString().substring(11, 19),
      };

      // Send a POST request to your Spring Boot API endpoint
      const response = await axios.post('http://localhost:8080/create', formattedValues);

      // Handle a successful response
      console.log('Event added:', response.data);

      // Optionally, reset the form
      resetForm();
    } catch (error) {
      // Handle errors
      console.error('Error adding event:', error);
    }

    setShouldRedirect(true);

  };

  
if (shouldRedirect) {
  return <Navigate to="/eventManagement" />;
}

  return (

<main id="main" class="main">

<div class="pagetitle">
      <h1>Add New Event</h1>
</div> 



<section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Event Details</h5>

    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
             <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
      <label htmlFor="place" className="form-label">
        Place
      </label>
      <Field
        type="text"
        id="place"
        name="place"
        className="form-control"
      />
      <ErrorMessage name="place" component="div" className="text-danger" />
    </div>

    <div className="mb-3">
      <label htmlFor="day" className="form-label">
        Day
      </label>
      <Field
        type="date"
        id="day"
        name="day"
        className="form-control"
      />
      <ErrorMessage name="day" component="div" className="text-danger" />
    </div>

    <div className="mb-3">
      <label htmlFor="startHour" className="form-label">
        Start Hour
      </label>
      <Field
        type="time"
        id="startHour"
        name="startHour"
        className="form-control"
      />
      <ErrorMessage name="startHour" component="div" className="text-danger" />
    </div>

    <div className="mb-3">
      <label htmlFor="endHour" className="form-label">
        End Hour
      </label>
      <Field
        type="time"
        id="endHour"
        name="endHour"
        className="form-control"
      />
      <ErrorMessage name="endHour" component="div" className="text-danger" />
    </div>

    <div className="mb-3">
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <Field
        as="textarea"
        id="description"
        name="description"
        className="form-control"
      />
      <ErrorMessage name="description" component="div" className="text-danger" />
    </div>

    <div className="mb-3">
      <label htmlFor="placesAvailable" className="form-label">
        Places Available
      </label>
      <Field
        type="number"
        id="placesAvailable"
        name="placesAvailable"
        className="form-control"
      />
      <ErrorMessage name="placesAvailable" component="div" className="text-danger" />
    </div>

    <div className="mb-3">
      <label htmlFor="imageFilePath" className="form-label">
        Image File Path
      </label>
      <Field
        type="text"
        id="imageFilePath"
        name="imageFilePath"
        className="form-control"
      />
      <ErrorMessage name="imageFilePath" component="div" className="text-danger" />
    </div>
              
    <div className="mb-3">
                {/* Use Bootstrap grid system for button placement */}
                <div className="d-flex justify-content-between">
                  <Link to="/eventManagement">
                    <Button type="button" variant="primary">
                      Back
                    </Button>
                  </Link>

                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div></div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>

    </div></div></div></div></section>
    </main>
  );
};

export default BookingForm;