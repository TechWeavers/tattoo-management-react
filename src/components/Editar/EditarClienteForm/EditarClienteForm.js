import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarClienteForm({ user, closeAlert, clienteCpfAtual }) {
  
  // Variáveis do cliente
  const [nome, setNome] = useState(user.nome ?? "");
  const [cpf, setCpf] = useState(user.cpf ?? "");
  const [telefone, setTelefone] = useState(user.telefone ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [idade, setIdade] = useState(user.idade ?? "");
  
  useEffect(() => {
    if (user.length > 0) { 
      const userData = user[0];
      setNome(userData.nome ?? "");
      setCpf(userData.cpf ?? "");
      setTelefone(userData.telefone ?? "");
      setEmail(userData.email ?? "");
      setIdade(userData.idade ?? "");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      Swal.fire({
        title: "Aguarde um momento...",
        html: "Atualizando informações do usuário",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      const token = localStorage.getItem('token');
      const auth = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const editedClienteData = { nome, cpf, telefone, email, idade};

      const response = await axios.patch(`http://localhost:8001/atualizar-cliente/${clienteCpfAtual}`, editedClienteData, auth);

      Swal.fire({
        title: "Atualizado com sucesso!",
        text: "As informações do usuário foram atualizadas",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800",
      }).then(() => {
        window.location.reload();
      });

    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "deu merda aq chefia",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="number"
            name="telefone"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            id="cpf"
            name="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            id="idade"
            name="idade"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Atualizar Usuário
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarClienteForm;
