import React, { useState } from 'react';
import axios from 'axios';
import './LoginSW.min.css'; 


function LoginSW() {

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
        <section className="position-relative py-4 py-xl-5">
            <div className="container">
                <div className="row d-flex justify-content-center m-auto" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                    <div className="col-md-6 col-xl-4">
                        <div className="card mb-5">
                            <div className="card-body bg-black bg-opacity-10 border rounded-0 d-flex flex-column align-items-center">
                                <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                                    </svg>
                                </div>
                                <form className="text-center" onSubmit={handleSubmit}>
                                    <div className="mb-3"><input className="form-control" type="text" name="usuario" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                                    <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Senha"  value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Entrar</button></div>
                                    <p className="text-muted">Esqueceu a senha?</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginSW;