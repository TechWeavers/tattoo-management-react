import React, { useState } from 'react';
import axios from 'axios';
import './EsqueceuForm.css';

function EsqueceuForm() {
    const [email, setEmail] = useState('');
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8002/email', {
                email: [email]
            });
            alert('Email de recuperação de senha enviado');
            setEmail('');
        } catch (error) {
            // If an error occurs during the axios request, set the error message state
            alert('Esse email não possuí um usuário cadastrado');
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
                        Recuperar senha
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

export default EsqueceuForm;