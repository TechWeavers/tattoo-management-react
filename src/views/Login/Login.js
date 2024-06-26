
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import DarkMode from '../../components/Darkmode/Darkmode';
//import { setToken } from '../../db';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the useNavigate hook
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                email,
                password
            });

            // Check if the response was successful
            if (response.status === 200) {
                
                // Store token in localStorage
                //localStorage.setItem('token', response.data); por enquanto vamos armazenar o token no indexedDB
                const token = response.data;
                console.log(token)
                localStorage.setItem('token', token)
                //await setToken(token);
                
                //console.log(response.data)
                // Successful authentication, redirect to /dashboard page
                navigate('/dashboard');
            } else {
                // Authentication failed, display an error message
                console.error('Error authenticating user');
            }
        } catch (error) {
            if (error/*error.response && error.response.data && error.response.data.message*/) {
              Swal.fire({
                title: error.response.data.detail,
                text: "",
                icon: "error",
                confirmButtonColor: "#FFB800",
                iconColor: "#ffb800"
              });
            } 
          }
    };


    return (
        
        <section className="position-relative py-4 py-xl-5" >
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-3">
                <div className="card mb-5 login shadow-sm ">

                  <div className="card-body p-sm-5">
                    <h2 className="text-center mb-4">InkDash<br></br>Tattoo management</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <button className="btn btn-primary d-block w-100" type="submit">
                          Entrar
                        </button>
                      </div>
                      <div>
                        <div className="text-center"><a className="small" href="esqueceu-senha">Esqueceu a Senha?</a></div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          <DarkMode></DarkMode>
        </section>
        
        
        

    );


}

export default Login;