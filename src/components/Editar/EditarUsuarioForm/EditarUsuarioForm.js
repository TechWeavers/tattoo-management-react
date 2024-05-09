import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function EditarUsuarioForm({ user, closeAlert, userEmailAtual }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.length > 0) { 
      const userData = user[0];
      setName(userData.name ?? "");
      setEmail(userData.email ?? "");
      setTipo(userData.tipo ?? "");
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

      const editedUserData = { name, email, tipo, password};
      const response = await axios.patch(`http://localhost:8001/atualizar-usuario/${userEmailAtual}`, editedUserData, auth);

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
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
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
          <select
            className="form-select"
            aria-label="Default select example"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione uma opção</option>
            <option value="Tatuador">Tatuador</option>
            <option value="Administrador">Administrador</option>
          </select>
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