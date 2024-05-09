import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NovoClienteForm() {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');

  
  const navigate = useNavigate(); // Get the useNavigate hook

  const token = localStorage.getItem('token');
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8003/novo-cliente', {
        nome,
        cpf,
        telefone,
        email,
        idade,
      }, auth);

      Swal.fire({
        title: "Cliente cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });

      setNome('');
      setCPF('');
      setTelefone('');
      setEmail('');
      setIdade('');

      navigate('/listar-clientes');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro ao cadastrar o cliente",
        text: "Opa, erro ao manipular o cliente no banco de dados",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div className="col-sm-10 p-3 min-vh-100 ms-auto">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                      <h2 className="text-center mb-4">Cadastro de Cliente</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome do cliente"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="number"
                            id="CPF"
                            name="cpf"
                            placeholder="CPF do cliente"
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="text"
                            id="telefone"
                            name="telefone"
                            placeholder="Telefone do cliente"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                          />
                        </div>
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
                            type="number"
                            id="idade"
                            name="idade"
                            placeholder="Idade do cliente"
                            value={idade}
                            onChange={(e) => setIdade(e.target.value)}
                            required
                          />
                        </div>
                        {/*<div className="mb-3">
                          <button
                            className={`btn ${tipo === 'Tatuador' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleTipoChange('Tatuador')}
                            type="button"
                          >
                            Tatuador
                          </button>
                          <button
                            className={`btn ${tipo === 'Administrador' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleTipoChange('Administrador')}
                            type="button"
                          >
                            Administrador
                          </button>
                          </div>*/}
                        <div>
                          <button className="btn btn-primary d-block w-100" type="submit">
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

export default NovoClienteForm;
