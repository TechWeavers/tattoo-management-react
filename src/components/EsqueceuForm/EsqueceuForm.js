import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
 
 
function EsqueceuForm() {
    const [email, setEmail] = useState('');
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
         
          Swal.fire({
            title: "Aguarde um momento...",
            html: "Estamos enviando o email",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
            }
          })
 
          await axios.post('http://localhost:8002/EsqueceuSenha', {
            email: email
          });
 
          Swal.fire({
            title: "Enviado com sucesso!",
            text: "Cheque o endereço de email informado",
            icon: "success",
            confirmButtonColor: "#FFB800",
            iconColor: "#ffb800"
          });
          setEmail('');
        } catch (error) {
          Swal.fire({
            title: "Opa, não existe nenhum usuário com esse email",
            text: "Por favor, tente novamente",
            icon: "error",
            confirmButtonColor: "#FFB800",
            iconColor: "#ffb800"
          });
        }
    };
 
 
    return (
      <section className="position-relative py-4 py-xl-5">
        <div className="container position-relative">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card mb-5">
                <div className="card-body p-sm-5">
                  <h2 className="text-center mb-4">Recuperar senha</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <button className="btn btn-primary d-block w-100" type="submit">
                        Recuperar senha.
                      </button>
                    </div>
                  </form>
                  <div>
                    <div className="text-center"><a className="small" href="/">Voltar para o login</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
 
export default EsqueceuForm;