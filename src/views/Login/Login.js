import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the useNavigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                email,
                password,
            });

            // Check if the response was successful
            if (response.status === 200) {
                // Successful authentication, redirect to /dashboard page
                navigate('/dashboard');
            } else {
                // Authentication failed, display an error message
                console.error('Error authenticating user');
            }
        } catch (error) {
        console.error('Error processing request:', error);
        }
    };


    return (
        <div className="container" style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', msTransform: 'translateY(-50%)', MozTransform: 'translateY(-50%)', WebkitTransform: 'translateY(-50%)', OTransform: 'translateY(-50%)' }}>
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 col-xl-9 col-xxl-7">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h4 className="text-dark mb-4">InkDash - Tattoo Management</h4>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <input className="form-control form-control-user" type="text" id="email" placeholder="Nome de Usuário" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="mb-3">
                                                <input className="form-control form-control-user" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            </div>
                                            <div className="row mb-3">
                                                <p id="errorMsg" className="text-danger" style={{ display: 'none' }}>Paragraph</p>
                                            </div>
                                            <button className="btn btn-primary d-block btn-user w-100" id="submitBtn" type="submit">Entrar</button>
                                            <hr />
                                        </form>
                                        <div className="text-center"><a className="small" href="esqueceu-senha">Esqueceu a Senha?</a></div>
                                        <div className="text-center"><a className="small" href="novo-usuario">Cadastrar Novo Usuário</a></div>
                                        <div className="text-center"><a className="small" href="redefinir-senha">Teste redefinir</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;