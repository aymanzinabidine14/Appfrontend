import axios from 'axios';
import  React,{ useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAudioDescription, faBarsStaggered, faCalendarDays,faCheck,faCheckSquare,faCircle,faUser,faUsers,faX, faXmarkSquare} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Link,useParams } from "react-router-dom";


const breadcrumbStyle = {
  '--bs-breadcrumb-divider': "''", // Définissez la propriété CSS ici
};



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
      
   
<main id="main" class="main">


<section class="section">
  <div class="row">
   
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{SandageInfo.titre}</h5>

          <nav class="d-flex justify-content-end" style={breadcrumbStyle} aria-label="breadcrumb">
            <ol class="breadcrumb">

            {SandageInfo.booking == null && (
              <li class="breadcrumb-item"><Link  to={`/UpdateSandage/${id}`}  className="btn btn-info ">Edit</Link></li>

            )}
              <li class="breadcrumb-item"><button className="btn btn-danger " onClick={handledeletesandage}>delete</button></li>

              {SandageInfo.booking == null && (

              <li class="breadcrumb-item"><button className="btn btn-primary " onClick={handleCopyLink}>copy Link</button></li>
              )}


            </ol>
          </nav>



          <p><FontAwesomeIcon icon={faUser}  size="xl"/> You are the organizer of the group event</p>


          <p><FontAwesomeIcon icon={faBarsStaggered} size="xl"></FontAwesomeIcon> {SandageInfo.description}</p>

          {SandageInfo.booking !== null && (
          <div>
          <div class="alert alert-success" role="alert" style={{width: '300px'}}>
          <FontAwesomeIcon icon={faCalendarDays} size="xl"></FontAwesomeIcon>  {OptionBooked.dateF} • {OptionBooked.startTime}-{OptionBooked.endTime}
          </div>
          <p><FontAwesomeIcon icon={faUsers} size="xl"></FontAwesomeIcon>  Participants :</p>
                  
                  {Participants.map(user => (
                  <p><FontAwesomeIcon icon={faCheck} size="lg"  style={{ color: 'green' }} ></FontAwesomeIcon> {user.username}</p>
                  ))}
                  </div>
          )}




        </div>
      </div>

     
      {SandageInfo.booking == null && (
    <>
    <div class="pagetitle">
    <h1>Availabilities :</h1>
    </div>

    <div className="container">
    <div className="table-responsive">
      <table className="table table-bordered">
  <thead>
        <tr>
  <th>Participants</th>
  {dateFormat.map((event,) => (
    <th>{event.dateF}<br></br>{event.startTime}<br></br>{event.endTime}<br></br><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>{event.numUser+1}</th>
  ))}
</tr>
</thead>
  <tbody>
  <tr>
      <td>{organizer.username} (you)</td>
      {
      options.map(event => (
        <td><FontAwesomeIcon icon={faCheckSquare}  size="xl"  style={{ color: 'green' }}></FontAwesomeIcon></td>
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
              {bool ? <FontAwesomeIcon size="xl" icon={faCheckSquare} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faXmarkSquare}  size="xl" style={{ color: 'red' }} />}
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
    <td colSpan={options.length + 1}>No participants yet .</td>
  </tr>
)
}

        </tbody>
      </table>
    </div>
  </div>
  </>
 
 )}

  </div>
</section>

</main>

  </div>



    )
}
export default SandageInfo;






