import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBBadge} from 'mdb-react-ui-kit';
import "./login.css" ;

function Login() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //window.location.reload();          

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
              const role=res.data.role;
              const username=res.data.username;

              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('role', JSON.stringify(role));
              localStorage.setItem('username', JSON.stringify(username));



              role === "USER" ?(
                window.location.href = '/home'
              ):(
                window.location.href = '/Dashboard'
                )


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
        
    
        <main>
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

          
              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p class="text-center small">Enter your Email & password to login</p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate>

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Email</label>
                      <div class="input-group has-validation">
                        <input type="text" name="username" class="form-control" id="yourUsername" 
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        required></input>
                        <div class="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input type="password" name="password" class="form-control" id="yourPassword"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required></input>
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div class="col-12">
                      
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit" onClick={login}>Login</button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">Don't have account? <a href="/Register">Create an account</a></p>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
  



    );}
  
  export default Login;