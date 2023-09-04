import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarDays,faCheck,faUser,faUsers,faX} from '@fortawesome/free-solid-svg-icons';




export const sandageApi=axios.create({
  baseURL:"http://localhost:8080",
  });
  
  
  export const addUserToOption = (myoption, user) => {
    return sandageApi.post(`/addUserToOption/${myoption}/${user}`);
};

export const addUserToSandage = (Sandage, user) => {
  return sandageApi.post(`/addUserToSandage/${Sandage}/${user}`);
};


function AddParticipation() {

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [selectedEventIds, setSelectedEventIds] = useState([]);
    const [dateFormat,setdateFormat]=useState([]);
    const [SandageInfo,setSandageInfo]=useState('');
    const [CurrentUser,setCurrentUser]=useState([]);
    const [Options,setOptions]=useState([]);
    const [Participants,setParticipants]=useState([]);
    const [vote,setVote]=useState(false);
    const [organizer,setOrganizer]=useState([]);
    const [OptionBooked,setOptionBooked]=useState([]);






    useEffect(() => {
      if (SandageInfo.booking !== null) {
        axios.get(`http://localhost:8080/OneOptionFormatDate/${id}`)
          .then(resp => {
            const sandage = resp.data;
            setOptionBooked(sandage);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }, []);


    useEffect(() => {
      axios.get(`http://localhost:8080/organizator/${id}`)
        .then(response => {
          setOrganizer(response.data);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    }, []);

    

    useEffect(() => {
      axios.get(`http://localhost:8080/user/${user}`)
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    }, []);



    useEffect(() => { loadvote();},[]);
    const loadvote =()=>{axios.get(`http://localhost:8080/notVoting/${id}/${user}`).then(resp=>{setVote(resp.data);})};


    useEffect(() => { loadParticipants();},[]);
    const loadParticipants =()=>{axios.get(`http://localhost:8080/OtherParticipants/${id}/${user}`).then(resp=>{setParticipants(resp.data);})};

    useEffect(() => { loadOptions();},[]);
    const loadOptions =()=>{axios.get(`http://localhost:8080/OptionsBySandage/${id}`).then(resp=>{setOptions(resp.data);})};
   
    useEffect(() => { loadSandage();},[]);
    const loadSandage =()=>{ 
    try{  
    axios.get(`http://localhost:8080/sandage/${id}`).then(resp=>{setSandageInfo(resp.data);});
    }catch (error) {
    console.error("Error get sandage", error);
    }}

    useEffect(() => { OptionsFormatDate();},[]);
    const OptionsFormatDate =()=>{
    try{  
    axios.get(`http://localhost:8080/OptionsFormatDate/${id}`).then(resp=>{setdateFormat(resp.data);})
    }catch(error){
    console.error("Error get OptionsFormatDate", error);
    }};

          const handleCheckboxChange = (event) => {
            setSelectedEventIds(prevSelectedEventIds => {
              if (prevSelectedEventIds.includes(event.idDate)) {
                return prevSelectedEventIds.filter(item => item.idDate !== event.idDate);
              } else {
                return [...prevSelectedEventIds, event];
              }
            });
          }
          
          const handleVoteSubmit = async () => {
          await addUserToSandage(id,user); 
          for(const event of selectedEventIds){                       
            try {
            await addUserToOption(event.idDate,user);
            } catch (error) {
              console.error("Error:", error);
            }}
            window.location.reload();          
          };


    return(
    <div>

    <div class="container mt-5">
        <div class="card mx-auto" style={{ width: '60rem' }}>
            <div class="card-body d-flex flex-row">

                <div class="col-md-6">
                  <h2>{SandageInfo.titre}</h2>
                  <p>{organizer.username} organise</p>  
                </div>             
            </div>
        </div>
    </div> 

    {SandageInfo.booking !== null &&
    <div class="container mt-5">
        <div class="card mx-auto" style={{ width: '60rem' }}>
            <div class="card-body d-flex flex-row">
                <div class="col-md-6">
                  <h2>Vous avez réservé !</h2>
                  <p>L'organisateur a choisi un horaire.</p>  
                  <div class="card text-bg-success mb-3" style={{ width: '20rem' }}>
                  <div class="card-body">
                  <p class="card-text">{OptionBooked.dateF} de {OptionBooked.startTime} a {OptionBooked.endTime}</p>
               </div>
               </div>
              </div>             
            </div>
        </div>
    </div>   
}

    {SandageInfo.booking === null &&
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-bordered">
    <thead>
          <tr>
    <th>ID</th>
    {dateFormat.map((event,) => (
      <th>{event.dateF}<br></br>{event.startTime}<br></br>{event.endTime}<br></br><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>{event.numUser+1}</th>
    ))}
  </tr>
  </thead>
    <tbody>



    {vote &&
    <tr>
      <td>{CurrentUser.username}</td>  
      {Options.map(event => {
            const bool = CurrentUser.options.some(theevent => event.idDate === theevent.idDate);
            return (
              <td key={event.idDate}>
                {bool ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}
              </td>
            );
          })} 
      </tr>
    }

   <tr>
    <td>{organizer.username} Organise</td> 
    {
        Options.map(event => (
          <td><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></td>
        ))} 
   
    </tr>

      {Participants.map(user => (
        <tr key={user.IdUser}>
          <td>{user.username}</td>
          {Options.map(event => {
            const bool = user.options.some(theevent => event.idDate === theevent.idDate);
            return (
              <td key={event.idDate}>
                {bool ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}
              </td>
            );
          })}
        </tr>
      ))}


    
    {!vote &&
       <tr>
        <th><button class="btn btn-success" type="submit" onClick={handleVoteSubmit}>Vote</button> </th>
        {dateFormat.map(event => (
            <th key={event.idDate}>
             <form>
             <input
             class="form-check-input"
            type="checkbox"
            onChange={() => handleCheckboxChange(event)}
            id={`checkbox-${event.idDate}`}/>
        </form>
            </th>
          ))}       
        </tr>
        }  
      </tbody>
        </table>
      </div>
    </div>
    
      }

        </div>
    )
}
export default AddParticipation;

