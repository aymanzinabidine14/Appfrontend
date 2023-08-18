import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'



function useEventsForUser(Iduser) {
  const [Events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/UsersForEvent/"+Iduser)
      .then(response => {
        setEvents(response.data);
      })
      
  }, []);

  return Events;
}





function SandageInfo() {

    const [Events,setEvents]= useState([]);

    const [SandageInfo,setSandageInfo]=useState('');

    const [Participants,setParticipants]=useState([]);







    useEffect(() => { loadSandage();},[]);
    const loadSandage =()=>{
        axios.get("http://localhost:8080/sandage/3")
        .then(resp=>{
          const sandage=resp.data;
          setSandageInfo(sandage);
        })
        };

        useEffect(() => { loadParticipant();},[]);
        const loadParticipant =()=>{
            axios.get("http://localhost:8080/UsersBySandage/3")
            .then(resp=>{
              const users=resp.data;
              setParticipants(users);
            })
            };

        
          useEffect(() => {
            axios.get("http://localhost:8080/OptionsBySandage/3")
              .then(response => {
                setEvents(response.data);
              })
              .catch(error => {
                console.error('Error fetching events:', error);
              });
        
          }, []);
        
        






    return(
        <div>


    <div class="container mt-5">
        <div class="card mx-auto" style={{ width: '60rem' }}>
            <div class="card-body d-flex flex-row">

                <div class="col-md-6">
                  <h2>{SandageInfo.titre}</h2>  
                  <p>You are the organizer of the group event.</p>
                  <p>1 hour</p>
                  <p>France, Paris (GMT+2)</p>

                   
        
                </div>

                <div class="col-md-6 mt-5">

                <div className="d-flex justify-content-end">
               <button className="btn btn-light "style={{ marginRight: '10px' }}>Preview</button>
               <button className="btn btn-light "style={{ marginRight: '10px' }}>Edit</button>
               <button className="btn btn-light "style={{ marginRight: '10px' }}>More</button>
               <button className="btn btn-primary "style={{ marginRight: '10px' }}>copy Link</button>

               </div>
                
                </div>
             
            </div>
        </div>
    </div>
    
    <div class="container mt-5">
        <div class="card mx-auto" style={{ width: '60rem' }}>
<div class="card-body d-flex flex-row">

<table className="table">
      <thead>
        <tr>
          <th>participant</th>
          {Events.map(event => (
            <th key={event.IdDate}>{event.idDate}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Participants.map(user => (
          <tr key={user.IdUser}>
            <td>{user.nom}</td>
            {Events.map(event => (
              <td>


                {user.eventList.map(theevent=>(
                  event.idDate === theevent.idDate ? (
                    'x'

                ) : (
                  " "
                )
            
                ))}
                
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

                </div>
                </div>
                </div>   

        </div>
    )
}
export default SandageInfo;





