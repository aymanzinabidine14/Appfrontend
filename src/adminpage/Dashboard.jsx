import axios from "axios";
import  React,{ useEffect,useState } from 'react';
import {Link} from "react-router-dom"



import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";




function Dashboard() {

const [users,setusers]=useState([]);
  
useEffect(() => { loadUserss();},[]);

  const loadUserss =()=>{
    axios.get("http://localhost:8080/usersInfo")
    .then(resp=>{
      setusers(resp.data);
    })
    };



    const handledeleteuser = async(idUser)=>{
    await axios.delete(`http://localhost:8080/deleteUser/${idUser}`);
    window.location.reload();          
    }
  
  return (
   

<main id="main" class="main">

<div class="pagetitle">
      <h1>Users List</h1>
</div>  


<section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Users List</h5>


              <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Sandage C</th>
                    <th scope="col">Sandage P</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>

                {users.map((user,) => (
                  <tr>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.sandageNumberC}</td>
                    <td>{user.sandageNumberP}</td>
                    <td>

      <p><button className="btn btn-danger" onClick={()=>handledeleteuser(user.idUser)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></p>

      <p> <Link to={`/UserInfo/${user.idUser}`}><button className="btn btn-success"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></Link></p>

      </td>
                </tr>
                ))}
                </tbody>
                </table>
  </div>
  </div>
  </div>
  </div>
  </section>

</main>
    
        
  );
  }
                            
  export default Dashboard;

