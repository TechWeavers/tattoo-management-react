import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import './Dashboard.css';

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
      setAgendamentos(response.data);
    } catch (error) {
      console.error('Error fetching agendamentos:', error);
    }
  }

  async function fetchMateriaisFaltantes() {
    try {
      const response = await axios.get('http://localhost:8007/materiais-faltantes', auth);
      setMateriais(response.data);
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
    }
  }

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="container d-flex justify-content-center mt-5">
          <div className="col-md-6">
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
                        <th scope="col" className="bg-secondary bg-opacity-10 text-center">Email cliente</th>
                        <th scope="col" className="bg-secondary bg-opacity-10 text-center">Data</th>
                      </tr>
                    </thead>
                    <tbody className="border-secondary border-3 rounded-3">
                      {agendamentos.map(agendamento => (
                        <tr key={agendamento._id}>
                          <td className="bg-transparent text-center">{agendamento.summary}</td>
                          <td className="bg-transparent text-center">{agendamento.description}</td>
                          <td className="bg-transparent text-center">{agendamento.attendees[0].email}</td>
                          <td className="bg-transparent text-center">
                            {agendamento.date ? formatDate(agendamento.date) : "Data não disponível"}
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
                      {materiais.map(material => (
                        <tr key={material.nome}>
                          <td className="bg-transparent text-center">{material.nome}</td>
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
        <div className="container d-flex justify-content-center mt-3">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg rounded-3">
                <div className="card-body">
                  <h3 className="card-title text-center">Quantidade de agendamentos no mês</h3>
                  <p className="text-center">{quantidadeAgendamentos}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg rounded-3">
                <div className="card-body">
                  <h3 className="card-title text-center">Valor bruto</h3>
                  <p className="text-center">{valorBruto}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg rounded-3">
                <div className="card-body">
                  <h3 className="card-title text-center">Média valor</h3>
                  <p className="text-center">{mediaValorAgendamentos}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <Sidebar />
      </div>
    </>
  );
}

export default Dashboard;
