import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await axios.post('http://127.0.0.1:8000/login', {
            username,
            password
        });

        // Verifique se a resposta foi bem-sucedida
        if (response.status === 200) {
            // Autenticação bem-sucedida, faça algo (por exemplo, redirecione para a página inicial)
            console.log('Usuário autenticado:', response.data);
        } else {
            // Autenticação falhou, exiba uma mensagem de erro
            console.error('Erro ao autenticar usuário');
        }
        } catch (error) {
        console.error('Erro ao processar requisição:', error);
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
                                                <input className="form-control form-control-user" type="text" id="username" placeholder="Nome de Usuário" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
                                        <div className="text-center"><a className="small" href="forgot-password.html">Esqueceu a Senha?</a></div>
                                        <div className="text-center"><a className="small" href="novo-usuario">Cadastrar Novo Usuário</a></div>
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