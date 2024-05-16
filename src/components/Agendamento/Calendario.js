function Calendario() {

    return (
        <div className="col-md-11 p-3 min-vh-100 ">
            <div className="row justify-content-center  ">
                <div className="col-lg  ">
                    <div className="card bg-white border  shadow-lg border-3 rounded-3 bg-opacity-25">
                        <div className="card-body ">
                            <div className="row justify-content-center mb-4 ">
                                <div className="col-md-6  ">
                                    <h2 className="text-center mb-4">Agenda</h2>
                                    <div className="row justify-content-center mb-8">
                                        <div className="col-md-32 d-flex justify-content-between">
                                            <a href="/novo-agendamento"><button className="btn input-group bt-cadastrar" type="button">Novo agendamento</button></a>
                                            <div style={{ width: '100px' }}></div>
                                            <a href="/listar-agendamento"><button className="btn input-group bt-cadastrar" type="button">Editar agendamento</button></a>
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                            <div className="table-responsive rounded-3">
                                <table className="table bg-transparent   rounded-3 table-bordered table-fixed">
                                <iframe
                                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FSao_Paulo&bgcolor=%23F6BF26&mode=MONTH&title=InkDash&src=c2l4ZGV2c2ZhdGVjQGdtYWlsLmNvbQ&src=ZjNjMDBlZDM5NjAyOTA0YmQ5MzU4Y2NjMjQzMjY4NzllOWMyN2E4Nzk3MjIxNzE0ODA0MjM3NWYzOGY4Y2E3ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=cHQtYnIuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23E4C441&color=%230B8043"
                                    style={{ borderWidth: 0 }}
                                    width="100%"
                                    height="600"
                                    frameborder="0"
                                    scrolling="no"
                                ></iframe>

                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendario;
