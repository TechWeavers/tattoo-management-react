import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarMateriaisForm({ material, closeAlert, materialAtual }) {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [qtd, setQtd] = useState("");
    
  
    useEffect(() => {
      if (material.length > 0) { 
        const materialData = material[0];
        setName(materialData.name ?? "");
        setEmail(materialData.id ?? "");
        setTipo(materialData.qtd ?? "");
      }
    }, [material]);
  
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
  
        const editedMaterialData = { name, id, qtd};
        const response = await axios.patch(`http://localhost:8001/atualizar-material/${materialAtual}`, editedMaterialData, auth);
  
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
        <h2 className="text-center mb-4">Editar Material</h2>
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
              type="id"
              id="id"
              name="id"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
            >
            </select>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Atualizar Material
            </button>
          </div>
        </form>
      </div>
    );
  }