import Home from './page/Home';
import NewSandage from './page/NewSandage'; 
import SandageInfo from './page/SandageInfo';
import Login from './page/Login';

import {BrowserRouter,Link,Route,Routes,useNavigate} from "react-router-dom"
import Register from './page/Register';
import Dashboard from './adminpage/Dashboard';
import AddParticipation from './page/AddParticipation';
import Test from './page/test';
import UpdateSandage from './page/UpdateSandage';
import { Navigate} from "react-router-dom";
import  React,{ useState } from 'react';




import EventList from './eventpages/EventList';
import CreateEvent from './eventpages/CreateEvent';
import UpdateEvent from './eventpages/UpdateEvent';
import EventDetails from './eventpages/EventDetails';
import EventManagement from './eventpages/EventManagement';

import UserInfo from './adminpage/UserInfo'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import NavDropdown from 'react-bootstrap/NavDropdown';






function App() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const iduser = JSON.parse(localStorage.getItem('user'));
  const role = JSON.parse(localStorage.getItem('role'));
  const username = JSON.parse(localStorage.getItem('username'));



  console.log("user hello",iduser);


  const logout = () => {
    // Supprimez les données d'authentification de la mémoire locale
    localStorage.removeItem('user');
    
    window.location.href = '/';
    };



  return (


<BrowserRouter>
<header>


{iduser !== null &&(
<nav class="navbar navbar-expand-lg bg-body-tertiary">
 
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MEETX</a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
      {role === "USER" &&(
        <>

        <li class="nav-item">
        <Link class="nav-link active" aria-current="page" to={"/Home"}>Home</Link>
        </li>

        <li class="nav-item">
        <Link class="nav-link active" aria-current="page" to={"/eventList"}>Events</Link>
        </li>
        </>

      )}

      {role === "ADMIN" &&(
        <>

        <li class="nav-item">
        <Link class="nav-link active" aria-current="page" to={"/Dashboard"}>Users</Link>
        </li>

        <li class="nav-item">
        <Link class="nav-link active" aria-current="page" to={"/eventManagement"}>Events</Link>
        </li>
        </>

      )}
      </ul>

      <NavDropdown id="nav-dropdown-dark-example" title={username} menuVariant="light">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>

    </div>
  </div>
</nav>

)}

</header>
<body>
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

    <Route path="/eventManagement" element={<EventManagement />} />
    <Route path="/add" element={<CreateEvent />} />
    <Route path="/update/:id" element={<UpdateEvent />} />
    <Route path="/event/:idbooking" element={<EventDetails/>} />
    <Route path="/eventList" element={<EventList/>} />
    <Route path='/UserInfo/:id' element={<UserInfo/>}/>
    </Routes>
    
</body>
    </BrowserRouter>
    
 
    

  )
  
}

export default App;

