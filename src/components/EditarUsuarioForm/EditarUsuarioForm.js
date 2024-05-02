import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarUsuarioForm({ user, closeAlert }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [tipo, setTipo] = useState(user.tipo);
  const [password, setPassword] = useState('');

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

      await axios.patch(`http://localhost:8001/atualizar-usuario`, {
        name: name,
        email: email,
        tipo: tipo,
        password: password
      }, auth);

      Swal.fire({
        title: "Atualizado com sucesso!",
        text: "As informações do usuário foram atualizadas",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
      // Limpar os campos após o envio bem-sucedido
      setPassword('');
      // Fechar o alerta após a conclusão do envio bem-sucedido
      closeAlert();
    } catch (error) {
      Swal.fire({
        title: "Erro ao atualizar usuário",
        text: error.response.data.detail,
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Editar Usuário</h2>
      <p className="text-center mb-4">Caso não queira editar um dos <br></br>campos deixe-o em branco</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="btn-group" role="group" aria-label="Tipo de Usuário">
            <button
              type="button"
              className={`btn ${tipo === 'Tatuador' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTipo('Tatuador')}
            >
              Tatuador
            </button>
            <button
              type="button"
              className={`btn ${tipo === 'Administrador' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTipo('Administrador')}
            >
              Administrador
            </button>
          </div>
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

export default EditarUsuarioForm;
