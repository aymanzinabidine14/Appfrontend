import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import '../assets/css/style.css';
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";



export const sandageApi=axios.create({
  baseURL:"http://localhost:8080",
  });
  
  

export const UserUpdate=(iduser,username,email,password)=>{
  return sandageApi.post(`/updateUser/${iduser}/${username}/${email}/${password}`);
}

function UserInfo() {

  
const { id } = useParams();

const [username, setUsername]=useState(''); 
const [email, setemail]=useState(''); 
const [password, setpassword]=useState(''); 
const [sandagesc,setSandagesc]= useState([]);



useEffect(() => { loadSandagesC();},[]);
const loadSandagesC = () => {
  axios.get(`http://localhost:8080/sandagesC/${id}`)
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


useEffect(() => { loadSandage();},[]);
const loadSandage =()=>{
    axios.get(`http://localhost:8080/user/${id}`)
    .then(resp=>{
      const user=resp.data;
      setUsername(user.username);
      setemail(user.email);
      setpassword(user.password);
})
};


const handleUsernameChange = (event) => {
  setUsername(event.target.value);
};



const handleemailChange = (event) => {
  setemail(event.target.value);
};

const handlepasswordChange = (event) => {
  setpassword(event.target.value);
};




const handlesubmit=async()=>{
  UserUpdate(id,username,email,password);
  window.location.reload();
            

};



const handledeletesandage = async(idsandage)=>{
  await axios.delete(`http://localhost:8080/deleteSandage/${idsandage}`);
  window.location.reload();          
  }




  return (
    <div>

      
<main id="main" class="main">

<div class="pagetitle">
      <h1>Update user</h1>
</div>  



  <div class="container">
    <div class="row">

        <div class="col-md-4">

        <div class="card">
                <div class="card-body">
                <h5 class="card-title">Update user</h5>

                <form onSubmit={handlesubmit} >
                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-5 col-form-label">Username</label>
                      <div className="col-md-4 col-lg-9">
                        <input name="fullName" type="text" className="form-control"
                        value={username} 
                        onChange={handleUsernameChange}
                         />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-5 col-form-label">Email</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="email" type="text" className="form-control" 
                        value={email}
                        onChange={handleemailChange}
            
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-2 col-lg-5 col-form-label">Password</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="text" className="form-control" 
                        value={password}
                        onChange={handlepasswordChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-md-8 col-lg-3">
                      <button type="submit" className="btn btn-primary">Update</button>
                      </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">List sandage</h5>

                <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Sandage Title</th>
                    <th scope="col">Options</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Delete</th>

                  </tr>
                </thead>
                <tbody>
                {
sandagesc.map((sandage,index)=>(   
  <tr>
<td>{sandage.titre}</td>
<td>{sandage.numberOption}</td>
<td>{sandage.numberParticipant}</td>

<td>
<p><button className="btn btn-danger" onClick={()=>handledeletesandage(sandage.idSandage)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></p>
</td>
  </tr>

))}



                  </tbody>
                  </table>
                
                                  </div>
            </div>
        </div>
        
    </div>
</div>
        
      </main>
      
    </div>
  );
}

export default UserInfo;
