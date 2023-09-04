import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBBadge} from 'mdb-react-ui-kit';
import "./login.css" ;

function Login() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const navigate = useNavigate();
    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             
             if (res.data.message === "Email not exits") 
             {
               alert("Email not exits");
             } 
             else if(res.data.message === "Login Success")
             { 
              const user = res.data.idUser;
              localStorage.setItem('user', JSON.stringify(user));
              navigate(`/home`); 

            } 
              else 
             { 
                alert("Incorrect Email and Password not match");
             }
          }, fail => {
           console.error(fail); 
  });
        }
 
         catch (err) {
          alert(err);
        }
      
      }
    return (
        
        <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
  
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
          </MDBCol>
  
          <MDBCol col='4' md='6'>
  
            <div className="d-flex flex-row align-items-center justify-content-center">
  
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
  
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>
  
              <MDBBtn floating size='md' tag='a'  className='me-2'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>
  
              <MDBBtn floating size='md' tag='a'  className='me-2'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>
  
            </div>
  
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>
  
            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"
             value={email}
             onChange={(event) => {
               setEmail(event.target.value);
             }}
            />
            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
             value={password}
             onChange={(event) => {
               setPassword(event.target.value);
             }}
            />
  
            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>
  
            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg' onClick={login}>Login</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/Register" className="link-danger">Register</a></p>
            </div>
  
          </MDBCol>
  
        </MDBRow>
     
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
  
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved MeetX.
          </div>
        
       
        </div>
  
      </MDBContainer>
    );
  }
  
  export default Login;