import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function NovoEstoqueForm() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor_unitario, setValorUnitario] = useState('');
  const [data_atualizacao, setDataAtualizacao] = useState('');
  

  /*const handleTipoChange = (selectedTipo) => {
    setTipo(selectedTipo);
  };*/

  const token = localStorage.getItem('token');
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8004/novo-material', {
        nome,
        quantidade,
        valor_unitario,
      }, auth);

      Swal.fire({
        title: "Material cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });

      setNome('');
      setQuantidade('');
      setValorUnitario('');
      setDataAtualizacao('');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro ao cadastrar o material",
        text: error.response.data.detail,
        icon: "error",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
    }
  };

  return (
    <div className="col-sm-10 p-3 min-vh-100 ms-auto">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                      <h2 className="text-center mb-4">Cadastro de Materiais</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome do material"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            placeholder="Quantidade a ser adicionada"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="number"
                            id="valor_unitario"
                            name="valor_unitario"
                            placeholder="Valor por unidade"
                            value={valor_unitario}
                            onChange={(e) => setValorUnitario(e.target.value)}
                            required
                          />
                        </div>
                        {/*<div className="mb-3">
                          <button
                            className={`btn ${tipo === 'Tatuador' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleTipoChange('Tatuador')}
                            type="button"
                          >
                            Tatuador
                          </button>
                          <button
                            className={`btn ${tipo === 'Administrador' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleTipoChange('Administrador')}
                            type="button"
                          >
                            Administrador
                          </button>
                        </div>*/}
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

export default NovoEstoqueForm;
