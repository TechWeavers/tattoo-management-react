import React, { useEffect, useState } from 'react';
import './Navbar.min.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 function Navbar() {
  const [tipo, setTipo] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token')
    
    const carregarAtributo = async () => {
      try {

          const response = await axios.get(`http://localhost:8000/tipo-usuario/${token}`);

          // Extrair o atributo da resposta
          const tipoExtraido = response.data;

          // Atualizar o estado com o atributo extraído
          setTipo(tipoExtraido);
      } catch (error) {
          console.error('Erro ao carregar atributo:', error);
      }
  };

  carregarAtributo();
  },[]);
// Executa apenas uma vez, quando o componente é montado

function logout(){
  document.getElementById('logoutButton').addEventListener('click', function() {
    // Remover o item 'token' do localStorage
    localStorage.removeItem('token');
    // Redirecionar para a página de login ou atualizar a página
    navigate('/');
});
}



  return (
    <nav className="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
        <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/">
            <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
                <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                </svg>
            </span>
            <span>InkDash -          {tipo} </span>
            </a>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-5">
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-5">
            <ul className="navbar-nav ms-auto">              
            </ul>
            <button id="logoutButton" className="btn btn-primary ms-md-2" onClick={logout}>Sair</button>
            </div>
        </div>
    </nav>

  );
}


export default Navbar;