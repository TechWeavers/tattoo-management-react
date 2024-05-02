import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function NovoUsuarioForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('Tatuador');

  const handleTipoChange = (selectedTipo) => {
    setTipo(selectedTipo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8001/novo-usuario', {
        tipo,
        name,
        email,
        password,
      });

      Swal.fire({
        title: "Usuário cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro ao cadastrar o usuário",
        text: "Opa, erro ao cadastrar o usuário",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Cadastro de Usuário</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nome de Usuário"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
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
                </div>
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
  );
}

export default NovoUsuarioForm;
