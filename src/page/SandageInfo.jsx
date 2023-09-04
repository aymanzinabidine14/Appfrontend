import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarDays,faCheck,faUser,faUsers,faX} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Link,useParams } from "react-router-dom";





function SandageInfo() {

    const iduser = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams();

    const navigate = useNavigate();

    const [SandageInfo,setSandageInfo]=useState('');
    const [Participants,setParticipant]=useState([]);
    const [options,setOptions]=useState([]);
    const [booking,setBooking]=useState([]);
    const [dateFormat,setdateFormat]=useState([]);
    const [OptionBooked,setOptionBooked]=useState([]);
    const [organizer,setOrganizer]=useState([]);
    const [copied, setCopied] = useState(false);
    const linkToCopy = `http://localhost:3000/AddParticipation/${id}`; 


    const handleCopyLink = () => {
      navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
    };


    useEffect(() => {
      axios.get(`http://localhost:8080/user/${iduser}`)
        .then(response => {
          setOrganizer(response.data);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    }, []);

    
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


    useEffect(() => { loadSandage();},[]);
    const loadSandage =()=>{
        axios.get(`http://localhost:8080/sandage/${id}`)
        .then(resp=>{
          const sandage=resp.data;
          setSandageInfo(sandage);
        })
        };


    useEffect(() => { loadOptions();},[]);
    const loadOptions =()=>{axios.get(`http://localhost:8080/OptionsBySandage/${id}`).then(resp=>{setOptions(resp.data);})};


    const deleteSandage =()=>{axios.delete(`http://localhost:8080/deleteSandage/${id}`);}

    useEffect(() => { OptionsFormatDate();},[]);
    const OptionsFormatDate =()=>{axios.get(`http://localhost:8080/OptionsFormatDate/${id}`).then(resp=>{setdateFormat(resp.data);})};

    useEffect(() => { loadParticipants();},[]);
    const loadParticipants =()=>{axios.get(`http://localhost:8080/UsersBySandage/${id}`).then(resp=>{setParticipant(resp.data);})};


    
    
    const handleBooking = async (idOption) => {
      try {
        await axios.delete(`http://localhost:8080/booking/${id}/${idOption}`);
        console.log('Réservation effectuée avec succès');
      } catch (error) {
        console.error('Erreur lors de la réservation :', error);
      }
    };

    
    const handledeletesandage = async()=>{
      try{
    await axios.delete(`http://localhost:8080/deleteSandage/${id}`);
    navigate('/Home');
  }catch(error){
        console.error('');
      }
    }

   


    const handleRadioChange = (event) => {
      const selectedOptionId = event.target.value;
      setBooking(selectedOptionId);
    };



    const handleBookSubmit = async () => {
     
      handleBooking(booking);
      window.location.reload();
    };

   


    return(
        <div>
        
    
    <div class="container mt-5">
        <div class="card mx-auto" style={{ width: '60rem' }}>
            <div class="card-body d-flex flex-row">

                <div class="col-md-6">
                  <h2>{SandageInfo.titre}</h2>  
                  <p>You are the organizer of the group event</p>

                  {SandageInfo.booking !== null && (
                  <div>

                  <p><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>  {OptionBooked.dateF} • {OptionBooked.startTime}-{OptionBooked.endTime}</p>
                  <p><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>  {OptionBooked.numUser} invited</p>
                  
                  {Participants.map(user => (
                  <p><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> {user.username}</p>
                  ))}
                  </div>
                  )}

                </div>

                <div class="col-md-6 mt-5">

               <div className="d-flex justify-content-end">

               {SandageInfo.booking == null && (
                <div>
               <button className="btn btn-light "style={{ marginRight: '10px' }}>Preview</button>
               <Link  to={`/UpdateSandage/${id}`}  className="btn btn-light "style={{ marginRight: '10px' }}>Edit</Link>
               </div>
               )}

               <button className="btn btn-danger "style={{ marginRight: '10px' }} onClick={handledeletesandage}>delete</button>
               <button className="btn btn-primary "style={{ marginRight: '10px' }}onClick={handleCopyLink}>copy Link</button>

               </div>
                
                </div>
             
            </div>
        </div>
    </div>


<br></br>

    {SandageInfo.booking == null && (
    
      <div className="container">
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
    <tr>
        <td>{organizer.username}</td>
        {
        options.map(event => (
          <td><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></td>
        ))}
        </tr>


        {
  Participants.length > 0 ? (
    <>
      {Participants.map(user => (
        <tr key={user.IdUser}>
          <td>{user.username}</td>
          {options.map(event => {
            const bool = user.options.some(theevent => event.idDate === theevent.idDate);
            return (
              <td key={event.idDate}>
                {bool ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}
              </td>
            );
          })}
        </tr>
      ))}

      <tr>
        <th>
          <button class="btn btn-success" type="submit" onClick={handleBookSubmit}>Book it</button>
        </th>
        {options.map(event => (
          <th>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id={`inlineRadio${event.idDate}`}
                value={event.idDate}
                onChange={handleRadioChange}
              />
            </div>
          </th>
        ))}
      </tr>
    </>
  ) : (
    <tr>
      <td colSpan={options.length + 1}>Aucun participant n'est disponible.</td>
    </tr>
  )
}




           
           
          </tbody>
        </table>
      </div>
    </div>
   )}

  </div>



    )
}
export default SandageInfo;






