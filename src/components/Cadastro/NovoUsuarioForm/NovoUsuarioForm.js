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

  const token = localStorage.getItem('token');
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8001/novo-usuario', {
        tipo,
        name,
        email,
        password,
      }, auth);

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
    <div className="col-md-11 p-3 min-vh-100 ">
    <div className="row justify-content-center  ">
        <div className="col-lg  ">
            <div className="card bg-white border  shadow-lg border-3 rounded-3 bg-opacity-25">
                <div className="card-body ">
                    <div className="row justify-content-center mb-4 ">
                        <div className="col-md-6  ">
                      <h2 className="text-center mb-4">Cadastro de Usuário</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            className="form-control shadow-sm"
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
                            className="form-control shadow-sm"
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
                            className="form-control shadow-sm"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3 d-flex justify-content-evenly">
                          <button
                            className={`btn shadow-sm ${tipo === 'Tatuador' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleTipoChange('Tatuador')}
                            type="button"
                          >
                            Tatuador
                          </button>
                          <button
                            className={`btn shadow-sm ${tipo === 'Administrador' ? 'btn-primary' : 'btn-secondary'}`}
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
          </div>
        </div>
  );
}

export default NovoUsuarioForm;
