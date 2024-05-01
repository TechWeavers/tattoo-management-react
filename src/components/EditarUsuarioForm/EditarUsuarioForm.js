import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarUsuarioForm({ user, closeAlert }) {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [tipo, setTipo] = useState(user.tipo);
  const [senha, setSenha] = useState('');

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

      await axios.put(`http://localhost:8002/atualizar-usuario/${user._id}`, {
        nome: nome,
        email: email,
        tipo: tipo,
        senha: senha
      });

      Swal.fire({
        title: "Atualizado com sucesso!",
        text: "As informações do usuário foram atualizadas",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
      // Limpar os campos após o envio bem-sucedido
      setSenha('');
      // Fechar o alerta após a conclusão do envio bem-sucedido
      closeAlert();
    } catch (error) {
      Swal.fire({
        title: "Erro ao atualizar usuário",
        text: "Por favor, tente novamente",
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
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
