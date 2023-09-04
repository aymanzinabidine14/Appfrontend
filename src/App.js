import 'bootstrap/dist/css/bootstrap.css'
import Home from './page/Home';
import NewSandage from './page/NewSandage'; 
import SandageInfo from './page/SandageInfo';
import Login from './page/Login';

import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
import Register from './page/Register';
import Dashboard from './page/Dashboard';
import AddParticipation from './page/AddParticipation';
import Test from './page/test';
import UpdateSandage from './page/UpdateSandage';


import EventList from './eventpages/EventList';
import CreateEvent from './eventpages/CreateEvent';
import UpdateEvent from './eventpages/UpdateEvent';
import EventDetails from './eventpages/EventDetails';
import EventManagement from './eventpages/EventManagement';

import axios from 'axios';
import  React,{ useEffect,useState,useParams } from 'react';

function App() {

  return (

    
    <BrowserRouter>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Meetx</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to={"/Home"}>Home</Link>
          </li>
        </ul>

        <form class="d-flex">
          <Link to={"/Newsandage"} class="btn btn-outline-success" >New</Link>
        </form>
      </div>
    </div>
  </nav>


    <Routes>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/Newsandage" element={<NewSandage/>}></Route>
    <Route path="/SandageInfo/:id" element={<SandageInfo/>}></Route>
    <Route path="/Register" element= { <Register/>} />
    <Route path="/" element= { <Login/>} />
    <Route path="/Dashboard" element={<Dashboard/>}/>
    <Route path="/AddParticipation/:id" element={<AddParticipation/>}/>
    <Route path="/test" element={<Test/>}/>
    <Route path="/UpdateSandage/:id" element={<UpdateSandage/>}/>

    <Route path="/admin" element={<EventManagement />} />
    <Route path="/add" element={<CreateEvent />} />
    <Route path="/update" element={<UpdateEvent />} />
    <Route path="/event/:idbooking" element={<EventDetails/>} />
    <Route path="/eventList" element={<EventList/>} />
 

    </Routes>
    </BrowserRouter>


  )
  
}

export default App;

