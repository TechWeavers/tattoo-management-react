import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './EditarFicha.css'

function EditarClienteForm({ user, closeAlert, clienteCpfAtual }) {

  // Variáveis do cliente
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

  // Estado para controle do tratamento
  const [isTratamentoAtivo, setIsTratamentoAtivo] = useState(false);
  const [isCirurgiaAtivo, setIsCirurgiaAtivo] = useState(false);
  const [isAlergiaAtivo, setIsAlergiaAtivo] = useState(false);
  const [isDiabetesAtivo, setIsDiabetesAtivo] = useState(false);
  const [isConvulsaoAtivo, setIsConvulsaoAtivo] = useState(false);
  const [isDoencasTransmissiveisAtivo, setIsDoencasTransmissiveisAtivo] = useState(false);



  const [isCardiacoAtivo, setIsCardiacoAtivo] = useState(false);
  const [isCancerAtivo, setIsCancerAtivo] = useState(false);
  const [isDrogasAtivo, setIsDrogasAtivo] = useState(false);
  const [isPressaoAtivo, setIsPressaoAtivo] = useState(false);
  const [isAnemiaAtivo, setIsAnemiaAtivo] = useState(false);
  const [isHemofiliaAtivo, setIsHemofiliaAtivo] = useState(false);


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

      const editedClienteData = { tratamento, desc_tratamento, cirurgia, desc_cirurgia, alergia, desc_alergia, diabetes, desc_diabetes, convulsao, desc_convulsao, doencas_transmissiveis, desc_doencas_transmissiveis, cardiaco, cancer, drogas, pressao, anemia, hemofilia, hepatite, outro_desc, data_atualizacao };

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
        text: "Algo deu errado",
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div >
      <h2 className="text-center mb-4">Editar Usuário</h2>
      <p className="text-center mb-4">Caso não queira editar um dos <br />campos deixe-o em branco</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-3 form-check-inline">
            <label className="form-check-label " > Sim </label>
            <input
              type="radio"
              name="tratamento"
              value="sim"
              className="form-check-input me-5"
              checked={tratamento === "sim"}
              onChange={(e) => {
                setTratamento(e.target.value);
                setIsTratamentoAtivo(true);
              }}
            />{" "}
           


            
            <input
              type="radio"
              name="tratamento"
              value="nao"
              className="form-check-input"
              checked={tratamento === "nao"}
              onChange={(e) => {
                setTratamento(e.target.value);
                setIsTratamentoAtivo(false);
                setDescTratamento(" "); // Limpar a descrição do tratamento se "Não" for selecionado
              }}
            />{" "}
            <label className="form-check-label" >Não
            </label>
          </div>
          {isTratamentoAtivo && (
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="desc_tratamento"
                name="desc_tratamento"
                
                placeholder="Descrição do Tratamento"
                value={desc_tratamento}
                onChange={(e) => setDescTratamento(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <div className="mb-3 form-check-inline">
            <label className="form-check-label ">Sim
            </label>
              <input
                type="radio"
                name="cirurgia"
                value="sim"
                className="form-check-input me-5"
                checked={cirurgia === "sim"}
                onChange={(e) => {
                  setCirurgia(e.target.value);
                  setIsCirurgiaAtivo(true);
                }}
              />{" "}
              
            
              <input
                type="radio"
                name="cirurgia"
                value="nao"
                className="form-check-input me-5"
                checked={cirurgia === "nao"}
                onChange={(e) => {
                  setCirurgia(e.target.value);
                  setIsCirurgiaAtivo(false);
                  setDescCirurgia(" "); // Limpar a descrição do tratamento se "Não" for selecionado
                }}
              />{" "}
              <label className="form-check-label">
              Não
            </label>
          </div>
          {isCirurgiaAtivo && (
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="desc_cirurgia"
                name="desc_cirurgia"
                placeholder="Descrição do cirurgia"
                value={desc_cirurgia}
                onChange={(e) => setDescCirurgia(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <div className="mb-3 form-check-inline">
            <label>
              <input
                type="radio"
                name="alergia"
                value="sim"
                className="form-check-input me-5"
                checked={alergia === "sim"}
                onChange={(e) => {
                  setAlergia(e.target.value);
                  setIsAlergiaAtivo(true);
                }}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="alergia"
                value="nao"
                className="form-check-input me-5"
                checked={alergia === "nao"}
                onChange={(e) => {
                  setAlergia(e.target.value);
                  setIsAlergiaAtivo(false);
                  setDescAlergia(""); // Limpar a descrição da alergia se "Não" for selecionado
                }}
              />{" "}
              Não
            </label>
          </div>
          {isAlergiaAtivo && (
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="desc_alergia"
                name="desc_alergia"
                placeholder="Descrição da alergia"
                value={desc_alergia}
                onChange={(e) => setDescAlergia(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <div className="mb-3 form-check-inline">
            <label>
              <input
                type="radio"
                name="diabetes"
                value="sim"
                className="form-check-input me-5"
                checked={diabetes === "sim"}
                onChange={(e) => {
                  setDiabetes(e.target.value);
                  setIsDiabetesAtivo(true);
                }}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="diabetes"
                value="nao"
                className="form-check-input me-5"
                checked={diabetes === "nao"}
                onChange={(e) => {
                  setDiabetes(e.target.value);
                  setIsDiabetesAtivo(false);
                  setDescDiabetes(""); // Limpar a descrição da diabetes se "Não" for selecionado
                }}
              />{" "}
              Não
            </label>
          </div>
          {isDiabetesAtivo && (
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="desc_diabetes"
                name="desc_diabetes"
                placeholder="Descrição da diabetes"
                value={desc_diabetes}
                onChange={(e) => setDescDiabetes(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <div className="mb-3 form-check-inline">
            <label>
              <input
                type="radio"
                name="convulsao"
                value="sim"
                className="form-check-input me-5"
                checked={convulsao === "sim"}
                onChange={(e) => {
                  setConvulsao(e.target.value);
                  setIsConvulsaoAtivo(true);
                }}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="convulsao"
                value="nao"
                className="form-check-input me-5"
                checked={convulsao === "nao"}
                onChange={(e) => {
                  setConvulsao(e.target.value);
                  setIsConvulsaoAtivo(false);
                  setDescConvulsao(""); // Limpar a descrição da convulsão se "Não" for selecionado
                }}
              />{" "}
              Não
            </label>
          </div>
          {isConvulsaoAtivo && (
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="desc_convulsao"
                name="desc_convulsao"
                placeholder="Descrição da convulsão"
                value={desc_convulsao}
                onChange={(e) => setDescConvulsao(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <div className="mb-3 form-check-inline">
            <label>
              <input
                type="radio"
                name="doencas_transmissiveis"
                value="sim"
                className="form-check-input me-5"
                checked={doencas_transmissiveis === "sim"}
                onChange={(e) => {
                  setDoencasTransmissiveis(e.target.value);
                  setIsDoencasTransmissiveisAtivo(true);
                }}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="doencas_transmissiveis"
                value="nao"
                className="form-check-input me-5"
                checked={doencas_transmissiveis === "nao"}
                onChange={(e) => {
                  setDoencasTransmissiveis(e.target.value);
                  setIsDoencasTransmissiveisAtivo(false);
                  setDescDoencasTransmissiveis(""); // Limpar a descrição das doenças transmissíveis se "Não" for selecionado
                }}
              />{" "}
              Não
            </label>
          </div>
          {isDoencasTransmissiveisAtivo && (
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="desc_doencas_transmissiveis"
                name="desc_doencas_transmissiveis"
                placeholder="Descrição das doenças transmissíveis"
                value={desc_doencas_transmissiveis}
                onChange={(e) => setDescDoencasTransmissiveis(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
        <div className="mb-3 form-check-inline">
          <label>
            <input
              type="radio"
              name="cardiaco"
              value="sim"
              className="form-check-input me-5"
              checked={cardiaco === "sim"}
              onChange={(e) => {
                setCardiaco(e.target.value);
                setIsCardiacoAtivo(true);
              }}
            />{" "}
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="cardiaco"
              value="nao"
              className="form-check-input me-5"
              checked={cardiaco === "nao"}
              onChange={(e) => {
                setCardiaco(e.target.value);
                setIsCardiacoAtivo(false);
              }}
            />{" "}
            Não
          </label>
          </div>
        </div>
        <div>
        <div className="mb-3 form-check-inline">
            <label>
              Câncer:
              <input
                type="radio"
                name="cancer"
                value="sim"
                className="form-check-input me-5"
                checked={cancer === "sim"}
                onChange={(e) => {
                  setCancer(e.target.value);
                  setIsCancerAtivo(true);
                }}
              />{" "}
              Sim
              <input
                type="radio"
                name="cancer"
                value="nao"
                className="form-check-input me-5"
                checked={cancer === "nao"}
                onChange={(e) => {
                  setCancer(e.target.value);
                  setIsCancerAtivo(false);
                }}
              />{" "}
              Não
            </label>
            </div>
          </div>

          <div>
          <div className="mb-3 form-check-inline">
            <label>
              Drogas:
              <input
                type="radio"
                name="drogas"
                value="sim"
                className="form-check-input me-5"
                checked={drogas === "sim"}
                onChange={(e) => {
                  setDrogas(e.target.value);
                  setIsDrogasAtivo(true);
                }}
              />{" "}
              Sim
              <input
                type="radio"
                name="drogas"
                value="nao"
                className="form-check-input me-5"
                checked={drogas === "nao"}
                onChange={(e) => {
                  setDrogas(e.target.value);
                  setIsDrogasAtivo(false);
                }}
              />{" "}
              Não
            </label>
            </div>
          </div>

          <div>
          <div className="mb-3 form-check-inline">
            <label>
              Pressão:
              <input
                type="radio"
                name="pressao"
                value="sim"
                className="form-check-input me-5"
                checked={pressao === "sim"}
                onChange={(e) => {
                  setPressao(e.target.value);
                  setIsPressaoAtivo(true);
                }}
              />{" "}
              Sim
              <input
                type="radio"
                name="pressao"
                value="nao"
                className="form-check-input me-5"
                checked={pressao === "nao"}
                onChange={(e) => {
                  setPressao(e.target.value);
                  setIsPressaoAtivo(false);
                }}
              />{" "}
              Não
            </label>
            </div>
          </div>

          <div>
          <div className="mb-3 form-check-inline">
            <label>
              Anemia:
              <input
                type="radio"
                name="anemia"
                value="sim"
                className="form-check-input me-5"
                checked={anemia === "sim"}
                onChange={(e) => {
                  setAnemia(e.target.value);
                  setIsAnemiaAtivo(true);
                }}
              />{" "}
              Sim
              <input
                type="radio"
                name="anemia"
                value="nao"
                className="form-check-input me-5"
                checked={anemia === "nao"}
                onChange={(e) => {
                  setAnemia(e.target.value);
                  setIsAnemiaAtivo(false);
                }}
              />{" "}
              Não
            </label>
            </div>
          </div>

          <div>
          <div className="mb-3 form-check-inline">
            <label>
              Hemofilia:
              <input
                type="radio"
                name="hemofilia"
                value="sim"
                className="form-check-input me-5"
                checked={hemofilia === "sim"}
                onChange={(e) => {
                  setHemofilia(e.target.value);
                  setIsHemofiliaAtivo(true);
                }}
              />{" "}
              Sim
              <input
                type="radio"
                name="hemofilia"
                value="nao"
                className="form-check-input me-5"
                checked={hemofilia === "nao"}
                onChange={(e) => {
                  setHemofilia(e.target.value);
                  setIsHemofiliaAtivo(false);
                }}
              />{" "}
              Não
            </label>
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

export default EditarClienteForm;
