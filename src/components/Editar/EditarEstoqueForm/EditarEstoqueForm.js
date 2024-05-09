import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarEstoqueForm({ material, closeAlert, materialAtual }) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor_unitario, setValorUnitario] = useState("");
  //const [password, setPassword] = useState("");

  useEffect(() => {
    if (material.length > 0) { 
      const materialData = material[0];
      setNome(materialData.nome ?? "");
      setQuantidade(materialData.quantidade ?? "");
      setValorUnitario(materialData.valor_unitario ?? "");
    }
  }, [material]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { 
      Swal.fire({
        title: "Aguarde um momento...",
        html: "Atualizando informações do material",
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

      //const editedMaterialData = { nome, quantidade, valor_unitario};
      const response = await axios.patch(`http://localhost:8004/atualizar-material/${materialAtual}`,{ nome, quantidade, valor_unitario},  auth);

      Swal.fire({
        title: "Aguarde um momento...",
        html: "Atualizando informações do material",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
     

      Swal.fire({
        title: "Atualizado com sucesso!",
        text: "As informações do material foram atualizadas",
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
      <h2 className="text-center mb-4">Editar Estoque</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            id="quantidade"
            name="quantidade"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            id="valor_unitario"
            name="valor_unitario"
            placeholder="valor de cada unidade"
            value={valor_unitario}
            onChange={(e) => setValorUnitario(e.target.value)}
          />
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

export default EditarEstoqueForm;