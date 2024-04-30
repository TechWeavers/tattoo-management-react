import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function RedefinirSenhaForm() {
  const [senha, setSenha] = useState('');
  const [senhaNovamente, setSenhaNovamente] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      Swal.fire({
        title: "Aguarde um momento...",
        html: "Estamos alterando sua senha",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })

      await axios.put('http://localhost:8002/RedefinirSenha', {
        senha: senha,
        senhaConfirmacao: senhaNovamente
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire({
        title: "Senha alterada com sucesso!",
        icon: "success",
        confirmButtonColor: "#FFB800",
        iconColor: "#ffb800"
      });
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          title: "Opa",
          text: error.response.data.message,
          icon: "error",
          confirmButtonColor: "#FFB800",
          iconColor: "#ffb800"
        });
      } else {
        Swal.fire({
          title: "Erro",
          text: "Opa, não conseguimos alterar sua senha. Por favor, entre em contato como um administrador.",
          icon: "error",
          confirmButtonColor: "#FFB800",
          iconColor: "#ffb800"
        });
      }
    }
  };


  return (
    <section className="position-relative py-4 py-xl-5">
      <div className="container position-relative">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card mb-5">
              <div className="card-body p-sm-5">
                <h2 className="text-center mb-4">Redefinir senha</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      id="senhaNovamente"
                      name="senhaNovamente"
                      placeholder="senhaNovamente"
                      value={senhaNovamente}
                      onChange={(e) => setSenhaNovamente(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <button className="btn btn-primary d-block w-100" type="submit">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RedefinirSenhaForm;