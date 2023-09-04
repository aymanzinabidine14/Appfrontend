import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarDays,faCheck,faTrash,faUsers } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const spacing = 30;
const width = {
  width: spacing + 'rem',  
};

const styles = {
  position: 'absolute',
  top: 100+'px',
  left: 200+'px'

};


function Home() {

const iduser = JSON.parse(localStorage.getItem('user'));
const [sandagesc,setSandagesc]= useState([]);
const [sandagesp,setSandagesp]= useState([]);
const [allsandage,setallsandage]=useState([]);
const [dropdownTitle, setDropdownTitle] = useState('Sent');

useEffect(() => { loadSandagesC();},[]);

const loadSandagesC = () => {
  axios.get(`http://localhost:8080/sandagesC/${iduser}`)
    .then(resp => {
      const sandages = resp.data;
      Promise.all(
        sandages.map(sandage =>
          Promise.all([
            axios.get(`http://localhost:8080/NumberParticipant/${sandage.idSandage}`).then(resp => resp.data),
            axios.get(`http://localhost:8080/NumberOption/${sandage.idSandage}`).then(resp => resp.data)
          ])
        )
      ).then(results => {
        const updatedSandages = sandages.map((sandage, index) => ({
          ...sandage,
          numberParticipant: results[index][0],
          numberOption: results[index][1]
        }));
        setSandagesc(updatedSandages);
      });
    });
};






useEffect(() => { loadSandagesP();},[]);

const loadSandagesP = () => {
  axios.get(`http://localhost:8080/sandagesP/${iduser}`)
    .then(resp => {
      const sandages = resp.data;
      Promise.all(
        sandages.map(sandage =>
          Promise.all([
            axios.get(`http://localhost:8080/NumberParticipant/${sandage.idSandage}`).then(resp => resp.data),
            axios.get(`http://localhost:8080/NumberOption/${sandage.idSandage}`).then(resp => resp.data)
          ])
        )
      ).then(results => {
        const updatedSandages = sandages.map((sandage, index) => ({
          ...sandage,
          numberParticipant: results[index][0],
          numberOption: results[index][1]
        }));
        setSandagesp(updatedSandages);
      });
    });
};




useEffect(() => { loadALL();},[]);

const loadALL = () => {
  axios.get(`http://localhost:8080/AllSandageByUser/${iduser}`)
    .then(resp => {
      const sandages = resp.data;
      Promise.all(
        sandages.map(sandage =>
          Promise.all([
            axios.get(`http://localhost:8080/NumberParticipant/${sandage.idSandage}`).then(resp => resp.data),
            axios.get(`http://localhost:8080/NumberOption/${sandage.idSandage}`).then(resp => resp.data)
          ])
        )
      ).then(results => {
        const updatedSandages = sandages.map((sandage, index) => ({
          ...sandage,
          numberParticipant: results[index][0],
          numberOption: results[index][1]
        }));
        setallsandage(updatedSandages);
      });
    });
};




return (

<div class="home" style={styles}>
<div class="card" style={width}>
  <div class="card-body">
  <div class="card-body d-flex justify-content-between align-items-center">
    <h5 class="card-title">Invitations {iduser}</h5>

    <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
            <Dropdown.Item onClick={() => setDropdownTitle('Received')}>Received</Dropdown.Item>
            <Dropdown.Item onClick={() => setDropdownTitle('Sent')}>Sent</Dropdown.Item>
            <Dropdown.Item onClick={() => setDropdownTitle('All')}>All</Dropdown.Item>

          </DropdownButton>
      </div>
  {dropdownTitle === 'Sent' && (
  <div class="list-group">
  {
sandagesc.map((sandage,index)=>(   

<React.Fragment key={index}>
<Link  to={`/SandageInfo/${sandage.idSandage}`} class="list-group-item list-group-item-action">

<div class="d-flex w-100 justify-content-between">
<h5 class="mb-1">{sandage.titre}</h5>
</div>

{sandage.booking === null ?(
<p class="mb-1"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> {sandage.numberOption} Options</p>
):(
<p class="mb-1"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> {sandage.booking.date}</p>
)}
<p class="mb-1"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> {sandage.numberParticipant} invitees</p>

</Link>
<br /> 
    </React.Fragment>

    )
    )
    }
</div>
  )}
{dropdownTitle === 'Received' && (
  <div class="list-group">
  {
sandagesp.map((sandage,index)=>( 
<React.Fragment key={index}>
<Link  to={`/AddParticipation/${sandage.idSandage}`} class="list-group-item list-group-item-action">
<div class="d-flex w-100 justify-content-between">
  <h5 class="mb-1">{sandage.titre}</h5>
</div>
<p class="mb-1"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>   {sandage.numberOption} Options</p>
<p class="mb-1"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>{sandage.numberParticipant} invitees</p>
</Link>
<br /> 
    </React.Fragment>
    )
    )
    }
</div>
  )}
  
  {dropdownTitle === 'All' && (
  <div class="list-group">
  {
allsandage.map((sandage,index)=>( 
<React.Fragment key={index}>
<Link  to={`/AddParticipation/${sandage.idSandage}`} class="list-group-item list-group-item-action">
<div class="d-flex w-100 justify-content-between">
  <h5 class="mb-1">{sandage.titre}</h5>
</div>
<p class="mb-1"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>   {sandage.numberOption} Options</p>
<p class="mb-1"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>{sandage.numberParticipant} invitees</p>
</Link>
<br /> 
    </React.Fragment>
    )
    )
    }
</div>
  )}

  </div>
</div>
</div>
  )
}

export default Home