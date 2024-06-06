import React from "react";

function Error() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6">
                <div className="card bg-white border  shadow-lg border-3 rounded-3 bg-opacity-25 ">
                    <div className="card-body p-sm-5">
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-6 text-center">
                                <h2 className="mb-4">Erro 404</h2>
                                <p className="mb-4">Página não encontrada</p>
                                <a href="/" className="btn btn-primary fw-normal">Voltar para a página inicial</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;