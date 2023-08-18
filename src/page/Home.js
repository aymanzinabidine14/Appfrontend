import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDay, faCalendarDays, faDeleteLeft, faTrash, faTree, faUsers } from '@fortawesome/free-solid-svg-icons';

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

const [sandages,setSandages]= useState([]);

useEffect(() => { 
loadSandages();
},[]);

const loadSandages =()=>{
axios.get("http://localhost:8080/sandages")
.then(resp=>{
  const sandages=resp.data;
  setSandages(sandages);
})
};


  return (

<div class="home" style={styles}>
<div class="card" style={width}>
  <div class="card-body">
    <h5 class="card-title">Invitations</h5>
    <div class="list-group">
    {
    sandages.map((sandage,index)=>(
      
<React.Fragment key={index}>
<a href="#" class="list-group-item list-group-item-action">
<div class="d-flex w-100 justify-content-between">
  <h5 class="mb-1">{sandage.titre}</h5>
  <p><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></p>
</div>
<p class="mb-1"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>  2 Options</p>
<p class="mb-1"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>  2 Options</p>

</a>

<br /> {/* Ajout de la saute de ligne */}
    </React.Fragment>

    )
    )    
    }
 

</div>


  </div>
</div>
</div>





  )
}

export default Home