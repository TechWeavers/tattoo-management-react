import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarUsuarioForm({ user, closeAlert, userEmailAtual }) {
  
  //Variáveis do cliente
  const [name, setName] = useState(user.name ?? "");
  const [cpf, setCpf] = useState(user.cpf ?? "");
  const [telefone, setTelefone] = useState(user.telefone ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [idade, setIdade] = useState(user.idade ?? "");
  const [tratamento, setTratamento] = useState(user.tratamento ?? "");
  const [desc_tratamento, setDescTratamento] = useState(user.desc_tratamento ?? "");
  const [cirurgia, setCirurgia] = useState(user.cirurgia ?? "");
  const [desc_cirurgia, setDescCirurgia] = useState(user.desc_cirurgia ?? "");
  const [alergia, setAlergia] = useState(user.alergia ?? "");
  const [desc_alergia, setDescAlergia] = useState(user.desc_alergia ?? "");
  const [diabetes, setDiabetes] = useState(user.diabetes ?? "");
  const [desc_diabetes, setDescDiabetes] = useState(user.desc_diabetes ?? "");
  const [convulsao, setConvulsao] = useState(user.convulsao ?? "");
  const [desc_convulsao, setDescConvulsao] = useState(user.desc_convulsao ?? "");
  const [doencas_transmissiveis, setDoencasTransmissiveis] = useState(user.doencas_transmissiveis ?? "");
  const [desc_doencas_transmissiveis, setDescDoencasTransmissiveis] = useState(user.desc_doencas_transmissiveis ?? "");
  const [cardiaco, setCardiaco] = useState(user.cardiaco ?? "");
  const [cancer, setCancer] = useState(user.cancer ?? "");
  const [drogas, setDrogas] = useState(user.drogas ?? "");
  const [pressao, setPressao] = useState(user.pressao ?? "");
  const [anemia, setAnemia] = useState(user.anemia ?? "");
  const [hemofilia, setHemofilia] = useState(user.hemofilia ?? "");
  const [hepatite, setHepatite] = useState(user.hepatite ?? "");
  const [outro_desc, setOutroDesc] = useState(user.outro_desc ?? "");
  const [data_atualizacao, setDataAtualizacao] = useState(user.data_atualizacao ?? "");

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
      <p className="text-center mb-4">Caso não queira editar um dos <br></br>campos deixe-o em branco</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
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
