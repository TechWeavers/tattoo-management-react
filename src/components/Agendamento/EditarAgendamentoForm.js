import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarAgendamentoForm({ agendamento, closeAlert, agendamentoIdAtual }) {
  const [nome, setNome] = useState(agendamento.nome ?? "");
  const [descricao, setDescricao] = useState(agendamento.descricao ?? "");
  const [data, setData] = useState(agendamento.data ?? "");
  const [email_convidado, setEmail_convidado] = useState(agendamento.email_convidado ?? "");
  const [hora_inicio, setHora_inicio] = useState(agendamento.hora_inicio ?? "");
  const [hora_fim, setHora_fim] = useState(agendamento.hora_fim ?? "");

  useEffect(() => {
    if (agendamento.length > 0) { 
      const agendamentoData = agendamento[0];
      setNome(agendamentoData.nome ?? "");
      setDescricao(agendamentoData.descricao ?? "");
      setData(agendamentoData.data ?? "");
      setEmail_convidado(agendamentoData.email_convidado ?? "");
      setHora_inicio(agendamentoData.hora_inicio ?? "");
      setHora_fim(agendamentoData.hora_fim ?? "");
    }
  }, [agendamento]);
  
  const token = localStorage.getItem('token');
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validar se o tempo de fim é posterior ao tempo de início
    if (hora_inicio >= hora_fim) {
      Swal.fire({
        title: "Opa, perdeu a hora?",
        text: "A hora de fim deve ser posterior à hora de início.",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
      return; // Impede o envio do formulário se a validação falhar
    }

    // Validar se a data de início é posterior à data atual
    const currentDate = new Date().toISOString().split('T')[0]; // Obtemos a data atual
    if (data < currentDate) {
      Swal.fire({
        title: "Opa, voltou no tempo?",
        text: "A data de início deve ser igual ou posterior à data atual.",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
      return; // Impede o envio do formulário se a validação falhar
    }

    try {
      
      Swal.fire({
        title: "Aguarde um momento...",
        html: "Atualizando informações do usuário",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      await axios.patch(`http://localhost:8005/atualizar-agendamento/${agendamentoIdAtual}`, {
        nome,
        descricao,
        data,
        email_convidado,
        hora_inicio,
        hora_fim
      }, auth);

      Swal.fire({
        title: "Procedimento atualizado com sucesso!",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      }).then(() => {
        window.location.reload();
      });
  
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro ao atualizar procedimento",
        text: "Opa, erro ao atualizar o agendamento no banco de dados",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div className="">
      <h2 className="text-center mb-4">Atualizar agendamento</h2>
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
          />
        </div>
        <div>
          <button className="btn btn-primary d-block w-100" type="submit">
            Atualizar agendamento
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarAgendamentoForm;
