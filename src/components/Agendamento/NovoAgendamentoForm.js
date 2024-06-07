import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NovoAgendamentoForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [email_convidado, setEmail_convidado] = useState('');
  const [hora_inicio, setHora_inicio] = useState('');
  const [hora_fim, setHora_fim] = useState('');
  const [preco, setPreco] = useState('');
  const [materiais, setMateriais] = useState([]);
  const [novoMaterialNome, setNovoMaterialNome] = useState('');
  const [novoMaterialQuantidade, setNovoMaterialQuantidade] = useState('');
  const [materialCount, setMaterialCount] = useState(1); // Contador para o label "Material 01", "Material 02", etc.

  useEffect(() => {
    fetchMateriaisConsumo();
  }, []);

  async function fetchMateriaisConsumo() {
    try {
      const response = await axios.get('http://localhost:8004/buscar-material-consumo');
      const parsedMateriais = response.data.map(material => JSON.parse(material));
      setMateriais(parsedMateriais);
    } catch (error) {
      console.error('Error fetching materiais faltantes:', error);
    }
  }

  const addMaterial = () => {
    setMateriais([...materiais, { nome: novoMaterialNome, quantidade: novoMaterialQuantidade }]);
    setNovoMaterialNome('');
    setNovoMaterialQuantidade('');
    setMaterialCount(materialCount + 1); // Incrementa o contador de materiais
  };

  const removeMaterial = () => {
    if (materiais.length > 0) {
      const updatedMateriais = [...materiais];
      updatedMateriais.pop(); // Remove o último material adicionado
      setMateriais(updatedMateriais);
      setMaterialCount(materialCount - 1); // Decrementa o contador de materiais
    }
  };

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validações...

    try {
      await axios.post('http://localhost:8005/novo-agendamento', {
        nome,
        descricao,
        data,
        email_convidado,
        hora_inicio,
        hora_fim,
        preco,
        materiais
      }, auth);

      // Sucesso...

      navigate('/listar-agendamento');
    } catch (error) {
      // Tratamento de erro...
    }
  };

  return (
    <div className="col-md-11 p-3 min-vh-100 ">
      <div className="row justify-content-center  ">
        <div className="col-lg  ">
          <div className="card bg-white border  shadow-lg border-3 rounded-3 bg-opacity-75">
            <div className="card-body ">
              <div className="row justify-content-center mb-4 ">
                <div className="col-md-6  ">
                  <h2 className="text-center mb-4">Novo agendamento</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        className="shadow-sm form-control"
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome do agendamento"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="shadow-sm form-control"
                        type="text"
                        id="descricao"
                        name="descricao"
                        placeholder="Descrição do procedimento"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className=" shadow-sm form-control"
                        type="date"
                        id="data"
                        name="data"
                        placeholder="Data do agendamento"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="shadow-sm form-control"
                        type="email"
                        id="email"
                        name="email_convidado"
                        placeholder="Email do cliente"
                        value={email_convidado}
                        onChange={(e) => setEmail_convidado(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="shadow-sm form-control"
                        type="time"
                        id="hora_inicio"
                        name="hora_inicio"
                        placeholder="Hora de Início"
                        value={hora_inicio}
                        onChange={(e) => setHora_inicio(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="shadow-sm form-control"
                        type="time"
                        id="hora_fim"
                        name="hora_fim"
                        placeholder="Hora de fim"
                        value={hora_fim}
                        onChange={(e) => setHora_fim(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="shadow-sm form-control"
                        type="number"
                        id="preco"
                        name="preco"
                        placeholder="Preço estimado da tatuagem"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                      />
                    </div>

                    {/*<div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                        <table className="table bg-transparent rounded-3 table-bordered table-fixed">
                          <thead className="border-secondary border-3 rounded-3">
                            <tr>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Nome</th>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Quantidade</th>
                              <th scope="col" className="bg-secondary bg-opacity-10 text-center">Opções</th>
                            </tr>
                          </thead>
                          <tbody className="border-secondary border-3 rounded-3">
                            {materiais.length > 0 ? materiais.map((material, index) => (
                              <tr key={index}>
                                <td className="bg-transparent text-center">{material.nome}</td>
                                <td className="bg-transparent text-center">{material.quantidade}</td>
                                <td className="text-center bg-transparent d-flex justify-content-evenly">
                                                    
                                            
                                                  
                                </td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan="3" className="text-center">Nenhum material cadastrado</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div> */ }
                    
                    <div>
                      <button className="btn mt-4 btn-primary d-block w-100" type="submit">
                        Cadastrar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovoAgendamentoForm;

                     
