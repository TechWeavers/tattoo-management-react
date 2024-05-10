import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function FichaForm({ cliente, closeAlert, cpf }) {
  const [nome, setNome] = useState(cliente.nome ?? "");
  const [desc_tratamento, setDescTratamento] = useState(cliente.desc_tratamento ??"");
  const [desc_alergia, setDescAlergia] = useState(cliente.desc_alergia ??"");
  const [desc_diabetes, setDescDiabetes] = useState(cliente.desc_diabetes ?? "");
  const [desc_convulsao, setDescConvulsao] = useState(cliente.desc_convulsao ?? "");
  const [desc_doencas_transmissiveis, setDescDoencasTransmissiveis] = useState(cliente.desc_doencas_transmissiveis ?? "");
  const [cardiaco, setCardiaco] = useState(cliente.cardiaco ?? "");
  const [cancer, setCancer] = useState(cliente.cancer ?? "");
  const [drogas, setDrogas] = useState(cliente.drogas ?? "");
  const [pressao, setPressao] = useState(cliente.pressao ?? "");
  const [anemia, setAnemia] = useState(cliente.anemia ?? "");
  const [hemofilia, setHemofilia] = useState(cliente.hemofilia ?? "");

  useEffect(() => {
    if (cliente.length > 0) { 
      const clienteData = cliente[0];
      setNome(clienteData.nome ?? "");
      setDescTratamento(clienteData.desc_tratamento ?? "");
      setDescAlergia(clienteData.desc_alergia ?? "");
      setDescDiabetes(clienteData.diabetes ?? "");
      setDescConvulsao(clienteData.desc_convulsao ?? "");
      setDescDoencasTransmissiveis(clienteData.desc_doencas_transmissiveis?? "");
      setCardiaco(clienteData.cardiaco ?? "");
      setCancer(clienteData.cancer ?? "");
      setDrogas(clienteData.drogas ?? "");
      setPressao(clienteData.pressao ?? "");
      setAnemia(clienteData.anemia ?? "");
      setHemofilia(clienteData.hemofilia ?? "");
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

      const dados_ficha = { desc_tratamento, desc_alergia, desc_diabetes, desc_convulsao,  desc_doencas_transmissiveis, cardiaco, cancer, drogas, pressao, anemia, hemofilia};
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
        <label className='form-check-label'>Faz algum tratamento? Se sim, descreva-o.</label>
        <div className=" mb-3">
          <input
            className=" mt-2 form-control"
            type="text"  
            id="desc_tratamento"
            name="desc_tratamento"
            placeholder="Descrição do tratamento"
            value={desc_tratamento}
            onChange={(e) => setDescTratamento(e.target.value)}
          />
        </div>
        
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Tem alguma alergia? Se sim, descreva-a.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="desc_alergia"
            name="desc_alergia"
            placeholder="Descrição da alergia"
            value={desc_alergia}
            onChange={(e) => setDescAlergia(e.target.value)}
          />
        </div>
        
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Tem diabetes? Se sim, descreva-a minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="desc_diabetes"
            name="desc_diabetes"
            placeholder="Descrição da Diabetes"
            value={desc_diabetes}
            onChange={(e) => setDescDiabetes(e.target.value)}
          />
        </div>
        
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Já teve convulsão? Se sim, descreva-a minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="desc_convulsao"
            name="desc_convulsao"
            placeholder="Descrição da Convulsão"
            value={desc_convulsao}
            onChange={(e) => setDescConvulsao(e.target.value)}
          />
        </div>
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Portador de doença transmissível? descreva-a minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="desc_doencas_transmissiveis"
            name="desc_doencas_transmissiveis"
            placeholder="Descrição das doenças transmissíveis"
            value={desc_doencas_transmissiveis}
            onChange={(e) => setDescDoencasTransmissiveis(e.target.value)}
          />
        </div>
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Cardícaco? descreva o problema minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="cardiaco"
            name="cardicaco"
            placeholder="Cardíaco"
            value={cardiaco}
            onChange={(e) => setCardiaco(e.target.value)}
          />
        </div>
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Possui câncer? descreva-o minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="cancer"
            name="cancer"
            placeholder="Câncer"
            value={cancer}
            onChange={(e) => setCancer(e.target.value)}
          />
        </div>
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Possui problema com drogas? descreva-o minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="drogas"
            name="drogas"
            placeholder="Drogas"
            value={drogas}
            onChange={(e) => setDrogas(e.target.value)}
          />
        </div>
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Possui problema de pressão?  descreva-o minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="pressao"
            name="pressao"
            placeholder="Pressão"
            value={pressao}
            onChange={(e) => setPressao(e.target.value)}
          />
        </div>
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Tem anemia? descreva-a minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="anemia"
            name="anemia"
            placeholder="Anemia"
            value={anemia}
            onChange={(e) => setAnemia(e.target.value)}
          />
        </div>
        <div className=" mt-4 mb-3">
        <label className='form-check-label'>Possui hemofilia? descreva-a minimamente.</label>
          <input
            className="mt-2 form-control"
            type="text"
            id="hemofilia"
            name="hemofilia"
            placeholder="Hemofilia"
            value={hemofilia}
            onChange={(e) => setHemofilia(e.target.value)}
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