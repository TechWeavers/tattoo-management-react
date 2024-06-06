import React, { useState } from 'react';
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

  useEffect(() => {
    
    fetchMateriaisConsumo();
  }, []);

  async function fetchMateriaisConsumo() {
    try {
      const response = await axios.get('http://localhost:8004/buscar-material-consumo', auth);
      //setMateriais(response.data);
      const parsedMateriais = response.data.map(material => JSON.parse(material));
      setMateriais(parsedMateriais);
      //console.log("materiais: ",response.data)
      if (Array.isArray(response.data)) {
        setMateriais(response.data);
      } else {
        console.log("Resposta inválida:", response.data);
      }
    } catch (error) {
      console.error('Error fetching materiais faltantes:', error);
    }
  }


  const navigate = useNavigate(); // Get the useNavigate hook

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

      await axios.post('http://localhost:8005/novo-agendamento', {
        nome,
        descricao,
        data,
        email_convidado,
        hora_inicio,
        hora_fim,
        preco
      }, auth);

      console.log(nome,descricao,data,email_convidado,hora_fim,hora_inicio,preco)

      Swal.fire({
        title: "Procedimento agendado com sucesso!",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });

      setNome('');
      setDescricao('');
      setData('');
      setEmail_convidado('');
      setHora_inicio('');
      setHora_fim('');
      setPreco('');

      navigate('/listar-agendamento');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro ao agendar procedimento",
        text: error.response.data.detail,
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

                    {materiais.map(material => (
                      <ul key={material._id} className="list-group mt-2 text-white">
                        <li className="list-group-item d-flex justify-content-between align-content-center">
                          <div className="d-flex flex-row">
                            <div className="ml-2">
                              <h4 className="mb-0">{material.nome}</h4>
                              <div className="opacity-50">
                                <span>Quantidade: {material.quantidade}</span>
                              </div>
                            </div>
                          </div>
                          <div >
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <input type="checkbox" className='mb-2'></input>
                            <input type="number" className='col-sm-3 redounded' ></input>
                          </div>
                        </li>
                      </ul>


                    ))


                    }

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
