import React,{ useEffect, useState } from 'react';
import './Sidebar.min.css'; 
import axios from 'axios';


function Sidebar() {
    const [tipo, setTipo] = useState('')

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
  return (
            
                <div id="sidebar" className="pt-4 col-sm-1 sticky-top">
                    <div id="itensSidebar" className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
                        <ul
                            className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 pb-0 align-items-center">
                            <li>
                                <a href="/dashboard" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Products">
                                    <i className="bi bi-house h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Dashboard</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/calendario" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Home">
                                    <i className="bi bi-calendar-event h4 text-light"></i>
                                </a>
                                <p className="fw-light text-center fs-6 text-light">Agenda</p>
                            </li>
                            {tipo === "Administrador" && (
                            <li>
                                <a href="/listar-usuario" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Orders">
                                    <i className="bi bi-person-circle h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Usuarios</p>
                                </a>
                            </li>
                            )}
                            {/*<li>
                                <a href="/listar-usuario" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Orders">
                                    <i className="bi bi-person-circle h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Usuarios</p>
                                </a>
                            </li>*/}
                            <li>
                                <a href="/listar-materiais" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Products">
                                    <i className="bi bi-box2 h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Materiais</p>
                                </a>
                            </li>
                            <li>
                                <a href="/listar-clientes" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Products">
                                    <i className="bi bi-people h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Clientes</p>
                                </a>
                            </li>
                            

                        </ul>
                    </div>
                    
                </div>
            
    );
}

export default Sidebar;