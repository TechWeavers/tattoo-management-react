/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import './Dashboard.css';
import Swal from 'sweetalert2';
import Error from "../../components/Error/Error"

function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [quantidadeAgendamentos, setQuantidadeAgendamentos] = useState(0);
  const [mediaValorAgendamentos, setMediaValorAgendamentos] = useState(0);
  const [valorBruto, setValorBruto] = useState(0);

  const token = localStorage.getItem('token');
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    fetchListAgendamento();
    fetchMateriaisFaltantes();
    fetchQuantidadeAgendamentosNoMes();
    fetchMediaValorAgendamentosNoMes();
    fetchValorBruto();
  }, []);

  async function fetchListAgendamento() {
    try {
      const response = await axios.get('http://localhost:8007/proximos-agendamentos', auth);
      //setAgendamentos(response.data);
      if (Array.isArray(response.data)) {
        setAgendamentos(response.data);
    } else {
        console.log("Resposta inválida:", response.data);
    }
    } catch (error) {
      console.error('Error fetching agendamentos:', error);
    }
  }

  async function fetchMateriaisFaltantes() {
    try {
      const response = await axios.get('http://localhost:8007/materiais-faltantes', auth);
      //setMateriais(response.data);
      //onst parsedMateriais = response.data.map(material => JSON.parse(material));
      //setMateriais(parsedMateriais);
    
      if (Array.isArray(response.data)) {
        setMateriais(response.data);
        console.log(materiais)
    } else {
        console.log("Resposta inválida:", response.data);
    }
    } catch (error) {
      console.error('Error fetching materiais faltantes:', error);
    }
  }

  async function fetchQuantidadeAgendamentosNoMes() {
    try {
      const response = await axios.get('http://localhost:8007/quantidade-agendamentos', auth);
      setQuantidadeAgendamentos(response.data);
    } catch (error) {
      console.error('Error fetching quantidade de agendamentos no mês:', error);
    }
  }

  async function fetchMediaValorAgendamentosNoMes() {
    try {
      const response = await axios.get('http://localhost:8007/media-agendamentos', auth);
      setMediaValorAgendamentos(response.data);
    } catch (error) {
      console.error('Error fetching media de valor de agendamentos no mês:', error);
    }
  }

  async function fetchValorBruto() {
    try {
      const response = await axios.get('http://localhost:8007/valorBruto-agendamentos', auth);
      setValorBruto(response.data);
    } catch (error) {
      console.error('Error fetching valor bruto:', error);
      Swal.fire({
        title: "Erro ao  buscar algum dado do relatório!",
        text: "Opa, erro ao cadastrar o usuário",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  }

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    return `${formattedDate} ${formattedTime}`;
  };

  if(localStorage.getItem('token')){

  return (
    <>
      <Navbar />


      <div className="row">
        <Sidebar />
        <div className="col-md-11 p-3 min-vh-100 ">
          <div className="container">
            <div className="container d-flex justify-content-center ">
              <div className="col-md-4 mb-4 me-3">
                <div className="card shadow-lg rounded-3">
                  <div className='card-content'>
                    <div className="card-body">
                      <div className=" media d-flex justify-content-between ">
                        <div className="media-body text-left" >
                          <h3>{quantidadeAgendamentos}</h3>
                          <span > agendamentos no mês</span>
                        </div>
                        <div className='align-self-center'>
                          <i class="bi bi-calendar3 h1 float-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-md-4 mb-4 me-3">
                <div className="card shadow-lg rounded-3">
                  <div className='card-content'>
                    <div className="card-body">
                      <div className=" media d-flex justify-content-between ">
                        <div className="media-body text-left" >
                          <h3>{valorBruto}</h3>
                          <span>Valor bruto</span>

                        </div>
                        <div className='align-self-center'>
                          <i class="bi bi-calendar3 h1 float-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




              <div className="col-md-4 mb-4 me-3">
                <div className="card shadow-lg rounded-3">
                  <div className='card-content'>
                    <div className="card-body">
                      <div className=" media d-flex justify-content-between ">
                        <div className="media-body text-left" >
                          <h3>{mediaValorAgendamentos}</h3>
                          <span>Média valor</span>
                        </div>
                        <div className='align-self-center'>
                          <i class="bi bi-calendar3 h1 float-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="container d-flex justify-content-center mt-1">
              <div className="col-md-6 me-5">
                <div className="card shadow-lg rounded-3">
                  <div className="card-body">
                    <div className="row justify-content-center mb-4">
                      <div className="col-md-6">
                        <h3 className="text-center mb-4">Agendamentos próximos</h3>
                      </div>
                    </div>
                    {<div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                      <table className="table bg-transparent rounded-3 table-bordered table-fixed">
                        <thead className="border-secondary border-3 rounded-3">
                          <tr>
                            <th scope="col" className="bg-secondary bg-opacity-10 text-center">Nome</th>
                            <th scope="col" className="bg-secondary bg-opacity-10 text-center">Descrição</th>
                            <th scope="col" className="bg-secondary bg-opacity-10 text-center">Email cliente</th>
                            <th scope="col" className="bg-secondary bg-opacity-10 text-center">Data</th>
                          </tr>
                        </thead>
                        <tbody className="border-secondary border-3 rounded-3">
                          {agendamentos.map(agendamento => (
                            <tr key={agendamento._id}>
                              <td className="bg-transparent text-center">{agendamento.summary}</td>
                              <td className="bg-transparent text-center">{agendamento.description}</td>
                              <td className="bg-transparent text-center">{agendamento.attendees && agendamento.attendees[0].email && agendamento.attendees[0].email}</td>

                              <td className="bg-transparent text-center">
                                {agendamento.date ? formatDate(agendamento.date) : "Data não disponível"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-lg rounded-3">
                  <div className="card-body">
                    <div className="row justify-content-center mb-4">
                      <div className="col-md-6">
                        <h3 className="text-center mb-4">Materiais faltantes</h3>
                      </div>
                    </div>
                    <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                      <table className="table bg-transparent rounded-3 table-bordered table-fixed">
                        <thead className="border-secondary border-3 rounded-3">
                          <tr>
                            <th scope="col" className="bg-secondary bg-opacity-10 text-center">Nome</th>
                            <th scope="col" className="bg-secondary bg-opacity-10 text-center">Quantidade</th>
                            <th scope="col" className="bg-secondary bg-opacity-10 text-center">Valor unitário</th>
                          </tr>
                        </thead>
                        <tbody className="border-secondary border-3 rounded-3">
                          {materiais.map(material => (
                            <tr key={material._id}>
                              <td className="bg-transparent text-center">{material.nome}</td>
                              {console.log(material.nome)}
                              <td className="bg-transparent text-center">{material.quantidade}</td>
                              <td className="bg-transparent text-center">{material.valor_unitario}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}else{
  return (
    <>
      <Error></Error>
    </>
  );
}
}

export default Dashboard;*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import './Dashboard.css';
import Swal from 'sweetalert2';
import Error from "../../components/Error/Error";

function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [quantidadeAgendamentos, setQuantidadeAgendamentos] = useState(0);
  const [mediaValorAgendamentos, setMediaValorAgendamentos] = useState(0);
  const [valorBruto, setValorBruto] = useState(0);

  const token = localStorage.getItem('token');
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    fetchListAgendamento();
    fetchMateriaisFaltantes();
    fetchQuantidadeAgendamentosNoMes();
    fetchMediaValorAgendamentosNoMes();
    fetchValorBruto();
  }, []);

  async function fetchListAgendamento() {
    try {
      const response = await axios.get('http://localhost:8007/proximos-agendamentos', auth);
      if (Array.isArray(response.data)) {
        setAgendamentos(response.data);
        console.log(agendamentos)
    } else {
        console.log("Resposta inválida:", response.data);
    }
    } catch (error) {
      console.error('Error fetching agendamentos:', error);
    }
  }

  async function fetchMateriaisFaltantes() {
    try {
      const response = await axios.get('http://localhost:8007/materiais-faltantes', auth);
      console.log("Materiais recebidos do servidor:", response.data);
      if (Array.isArray(response.data)) {
        const parsedMateriais = response.data.map(material => JSON.parse(material.replace(/'/g, '"')));
        setMateriais(parsedMateriais);
      } else {
        console.log("Resposta inválida:", response.data);
      }
    } catch (error) {
      console.error('Error fetching materiais faltantes:', error);
    }
  }

  async function fetchQuantidadeAgendamentosNoMes() {
    try {
      const response = await axios.get('http://localhost:8007/quantidade-agendamentos', auth);
      setQuantidadeAgendamentos(response.data);
    } catch (error) {
      console.error('Error fetching quantidade de agendamentos no mês:', error);
    }
  }

  async function fetchMediaValorAgendamentosNoMes() {
    try {
      const response = await axios.get('http://localhost:8007/media-agendamentos', auth);
      setMediaValorAgendamentos(response.data);
    } catch (error) {
      console.error('Error fetching media de valor de agendamentos no mês:', error);
    }
  }

  async function fetchValorBruto() {
    try {
      const response = await axios.get('http://localhost:8007/valorBruto-agendamentos', auth);
      setValorBruto(response.data);
    } catch (error) {
      console.error('Error fetching valor bruto:', error);
      Swal.fire({
        title: "Erro ao buscar algum dado do relatório!",
        text: "Opa, erro ao cadastrar o usuário",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  }

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    return `${formattedDate} ${formattedTime}`;
  };

  if (localStorage.getItem('token')) {
    return (
      <>
        <Navbar />
        <div className="row">
          <Sidebar />
          <div className="col-md-11 p-3 min-vh-100">
            <div className="container">
              <div className="container d-flex justify-content-center">
                <div className="col-md-4 mb-4 me-3">
                  <div className="card shadow-lg rounded-3">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="media d-flex justify-content-between">
                          <div className="media-body text-left">
                            <h3>{quantidadeAgendamentos}</h3>
                            <span>agendamentos no mês</span>
                          </div>
                          <div className='align-self-center'>
                            <i className="bi bi-calendar3 h1 float-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4 me-3">
                  <div className="card shadow-lg rounded-3">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="media d-flex justify-content-between">
                          <div className="media-body text-left">
                            <h3>{valorBruto}</h3>
                            <span>Valor bruto</span>
                          </div>
                          <div className='align-self-center'>
                            <i className="bi bi-calendar3 h1 float-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4 me-3">
                  <div className="card shadow-lg rounded-3">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="media d-flex justify-content-between">
                          <div className="media-body text-left">
                            <h3>{mediaValorAgendamentos}</h3>
                            <span>Média valor</span>
                          </div>
                          <div className='align-self-center'>
                            <i className="bi bi-calendar3 h1 float-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container d-flex justify-content-center mt-1">
                <div className="col-md-6 me-5">
                  <div className="card shadow-lg rounded-3">
                    <div className="card-body">
                      <div className="row justify-content-center mb-4">
                        <div className="col-md-6">
                          <h3 className="text-center mb-4">Agendamentos próximos</h3>
                        </div>
                      </div>
                      <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                        <table className="table bg-transparent rounded-3 table-bordered table-fixed">
                          <thead className="border-secondary border-3 rounded-3">
                            <tr>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Nome</th>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Descrição</th>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Cliente</th>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Data</th>
                            </tr>
                          </thead>
                          <tbody className="border-secondary border-3 rounded-3">
                          {agendamentos.map(agendamento => (
                          <tr key={agendamento._id}>
                              <td className=" bg-transparent text-center">{agendamento.summary}</td>
                              <td className=" bg-transparent text-center">{agendamento.description}</td>
                              <td className=" bg-transparent text-center">{agendamento.cliente}</td>
                              <td className=" bg-transparent text-center">
                                  {agendamento.start && agendamento.start.dateTime ? formatDate(agendamento.start.dateTime) : "Data não disponível"}
                              </td>
                          </tr>
                      ))}
                                    </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card shadow-lg rounded-3">
                    <div className="card-body">
                      <div className="row justify-content-center mb-4">
                        <div className="col-md-6">
                          <h3 className="text-center mb-4">Materiais faltantes</h3>
                        </div>
                      </div>
                      <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                        <table className="table bg-transparent rounded-3 table-bordered table-fixed">
                          <thead className="border-secondary border-3 rounded-3">
                            <tr>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Nome</th>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Quantidade</th>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Valor unitário</th>
                            </tr>
                          </thead>
                          <tbody className="border-secondary border-3 rounded-3">
                            {materiais.length > 0 ? materiais.map(material => (
                              <tr key={material.nome}>
                                <td className="bg-transparent text-center">{material.nome}</td>
                                <td className="bg-transparent text-center">{material.quantidade}</td>
                                <td className="bg-transparent text-center">{material.valor_unitario}</td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan="3" className="text-center">Nenhum material faltante encontrado</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Error />
      </>
    );
  }
}

export default Dashboard;

