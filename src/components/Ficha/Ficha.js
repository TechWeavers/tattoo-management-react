import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function FichaForm({ cliente, closeAlert, cpf }) {
  const [nome, setNome] = useState(cliente.nome ?? "");
  const [tratamento, setTratamento] = useState(cliente.tratamento ?? "");
  const [desc_tratamento, setDescTratamento] = useState(cliente.desc_tratamento ??"");
  const [cirurgia, setCirurgia] = useState(cliente.cirurgia ??"");
  const [desc_cirurgia, setDescCirurgia] = useState(cliente.desc_cirurgia ??"");
  const [alergia, setAlergia] = useState(cliente.alergia ??"");
  const [desc_alergia, setDescAlergia] = useState(cliente.desc_alergia ??"");
  const [diabetes, setDiabetes] = useState(cliente.diabetes ?? "");
  const [desc_diabetes, setDescDiabetes] = useState(cliente.desc_diabetes ?? "");
  const [convulsao, setConvulsao] = useState(cliente.convulsao ?? "");
  const [desc_convulsao, setDescConvulsao] = useState(cliente.desc_convulsao ?? "");
  const [doencas_transmissiveis, setDoencasTransmissiveis] = useState(cliente.doencas_transmissiveis ?? "");
  const [desc_doencas_transmissiveis, setDescDoencasTransmissiveis] = useState(cliente.desc_doencas_transmissiveis ?? "");
  const [cardiaco, setCardiaco] = useState(cliente.cardiaco ?? "");
  const [cancer, setCancer] = useState(cliente.cancer ?? "");
  const [drogas, setDrogas] = useState(cliente.drogas ?? "");
  const [pressao, setPressao] = useState(cliente.pressao ?? "");
  const [anemia, setAnemia] = useState(cliente.anemia ?? "");
  const [hemofilia, setHemofilia] = useState(cliente.hemofilia ?? "");
  const [outro, setOutro] = useState(cliente.outro ?? "");
  //const [password, setPassword] = useState("");

  useEffect(() => {
    if (cliente.length > 0) { 
      const clienteData = cliente[0];
      setNome(clienteData.nome ?? "");
      setTratamento(clienteData.tratamento ?? "");
      setDescTratamento(clienteData.desc_tratamento ?? "");
      setCirurgia(clienteData.cirurgia ?? "");
      setDescCirurgia(clienteData.desc_cirurgia ?? "")
      setAlergia(clienteData.alergia ?? "")
      setDescAlergia(clienteData.desc_alergia ?? "")
      setDiabetes(clienteData.diabetes ?? "")
      setDescDiabetes(clienteData.diabetes ?? "")
      setConvulsao(clienteData.convulsao ?? "")
      setDescConvulsao(clienteData.desc_convulsao ?? "")
      setDoencasTransmissiveis(clienteData.doencas_transmissiveis?? "")
      setDescDoencasTransmissiveis(clienteData.desc_doencas_transmissiveis?? "")
      setCardiaco(clienteData.cardiaco ?? "");
      setCancer(clienteData.cancer ?? "");
      setDrogas(clienteData.drogas ?? "");
      setPressao(clienteData.pressao ?? "");
      setAnemia(clienteData.anemia ?? "");
      setHemofilia(clienteData.hemofilia ?? "");
      setOutro(clienteData.outro ?? "");
    }
  }, [cliente]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { 
      Swal.fire({
        title: "Aguarde um momento...",
        html: "Atualizando informações da ficha do cliente",
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

      const dados_ficha = { tratamento, desc_tratamento, cirurgia, desc_cirurgia, alergia, desc_alergia, diabetes, desc_diabetes, convulsao, desc_convulsao, doencas_transmissiveis, desc_doencas_transmissiveis, cardiaco, cancer, drogas, pressao, anemia, hemofilia, outro};
      await axios.patch(`http://localhost:8003/atualizar-ficha/${cpf}`,dados_ficha,  auth);
      Swal.fire({
        title: "Atualizado com sucesso!",
        text: "As informações da ficha de anamnese do cliente foram atualizadas",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800",
      }).then(() => {
        window.location.reload();
      });

    } catch (error) {
      Swal.fire({
        title: "Erro ao atualizar material",
        text: error.response.data.detail,
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4"> Ficha de Anamnese do {nome}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="tratamento"
            name="tratamento"
            placeholder="tratamento"
            value={tratamento}
            onChange={(e) => {
              setTratamento(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="desc_tratamento"
            name="desc_tratamento"
            placeholder="Descrição do tratamento"
            value={desc_tratamento}
            onChange={(e) => setDescTratamento(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="cirurgia"
            name="cirurgia"
            placeholder="cirurgia"
            value={cirurgia}
            onChange={(e) => setCirurgia(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="desc_cirurgia"
            name="desc_cirurgia"
            placeholder="Descrição da cirurgia"
            value={desc_cirurgia}
            onChange={(e) => setDescCirurgia(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="alergia"
            name="alergia"
            placeholder="Alergia"
            value={alergia}
            onChange={(e) => setAlergia(e.target.value)}
          />
        </div>
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
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="diabetes"
            name="diabetes"
            placeholder="Diabetes"
            value={diabetes}
            onChange={(e) => setDiabetes(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="desc_diabetes"
            name="desc_diabetes"
            placeholder="Descrição da Diabetes"
            value={desc_diabetes}
            onChange={(e) => setDescDiabetes(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="convulsao"
            name="convulsao"
            placeholder="Convulsão"
            value={convulsao}
            onChange={(e) => setConvulsao(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="desc_convulsao"
            name="desc_convulsao"
            placeholder="Descrição da Convulsão"
            value={desc_convulsao}
            onChange={(e) => setDescConvulsao(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="doencas_transmissiveis"
            name="doencas_transmissiveis"
            placeholder="doencas_transmissiveis"
            value={doencas_transmissiveis}
            onChange={(e) => setDoencasTransmissiveis(e.target.value)}
          />
        </div>
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
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="cardiaco"
            name="cardicaco"
            placeholder="Cardíaco"
            value={cardiaco}
            onChange={(e) => setCardiaco(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="cancer"
            name="cancer"
            placeholder="Câncer"
            value={cancer}
            onChange={(e) => setCancer(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="drogas"
            name="drogas"
            placeholder="Drogas"
            value={drogas}
            onChange={(e) => setDrogas(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="pressao"
            name="pressao"
            placeholder="Pressão"
            value={pressao}
            onChange={(e) => setPressao(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="anemia"
            name="anemia"
            placeholder="Anemia"
            value={anemia}
            onChange={(e) => setAnemia(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="hemofilia"
            name="hemofilia"
            placeholder="Hemofilia"
            value={hemofilia}
            onChange={(e) => setHemofilia(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="outro"
            name="outro"
            placeholder="Outro descrição"
            value={outro}
            onChange={(e) => setOutro(e.target.value)}
          />
        </div>
        
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Atualizar Ficha
          </button>
        </div>
      </form>
    </div>
  );
}

export default FichaForm;