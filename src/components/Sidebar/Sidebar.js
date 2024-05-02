import React from 'react';
import './Sidebar.min.css'; 

function Sidebar() {
  return (
    <div className="container-fluid">
            <div className="row">
                <div id="sidebar" className="col-sm-auto sticky-top">
                    <div id="itensSidebar" className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
                        <a href="#" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip"
                            data-bs-placement="right" data-bs-original-title="Icon-only">
                            <span
                                className="h2 bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" color="white"
                                    fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                                    <path fill-rule="evenodd"
                                        d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z">
                                    </path>
                                    <path
                                        d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z">
                                    </path>
                                </svg></span>
                        </a>
        

                        <ul
                            className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 pb-0 align-items-center">
                            <li className="nav-item">
                                <a href="#" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Home">
                                    <i className="bi bi-calendar-event h4 text-light"></i>
                                </a>
                                <p className="fw-light text-center fs-6 text-light">Agendamentos</p>
                            </li>
                            <li>
                                <a href="#" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Orders">
                                    <i className="bi bi-person-circle h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Usuarios</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Products">
                                    <i className="bi bi-box2 h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Materiais</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link py-1 px-2" title="" data-bs-toggle="tooltip"
                                    data-bs-placement="right" data-bs-original-title="Products">
                                    <i className="bi bi-people h4 text-light"></i>
                                    <p className="fw-light text-center fs-6 text-light">Clientes</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm p-3 min-vh-100">
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Sidebar;