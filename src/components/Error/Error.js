import React from "react";

function Error() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-3">
                <div className="card mb-5 login shadow-sm">
                    <div className="card-body p-sm-5">
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-6 text-center">
                                <h2 className="mb-4">Erro 404</h2>
                                <p className="mb-4">Página não encontrada</p>
                                <a href="/" className="btn btn-primary fw-normal">Voltar para a página inicial</a>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;