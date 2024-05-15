import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditarAgendamentoForm from "../../components/Agendamento/EditarAgendamentoForm";

const MySwal = withReactContent(Swal);

function ListarCalendarioTable() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [agendamentoIdAtual, setAgendamentoIdAtual] = useState("");

    const token = localStorage.getItem('token');
    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        fetchAgendamentos();
    }, []);

    const fetchAgendamentos = () => {
        axios.get("http://localhost:8005/listar-agendamentos", auth)
            .then(response => {
                if (response.data.agendamentos && Array.isArray(response.data.agendamentos)) {
                    setAgendamentos(response.data.agendamentos);
                } else {
                    console.log("Resposta inválida:", response.data);
                }
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (agendamentoId) => {
        console.log(agendamentoId); // Atualize o estado diretamente aqui
        axios.get(`http://localhost:8005/buscar-agendamento/${agendamentoId}`, auth)
            .then(response => {
                setAgendamentoIdAtual(agendamentoId);
                MySwal.fire({
                    html: <EditarAgendamentoForm 
                        agendamento={response.data} 
                        handleSubmit={handleSubmit} 
                        agendamentoIdAtual={agendamentoId} 
                    />,
                    customClass: {
                        container: 'my-swal-container',
                        popup: 'my-swal-popup',
                        content: 'my-swal-content',
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-secondary'
                    },
                    showConfirmButton: false
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Erro ao atualizar agendamento",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };

    const handleSubmit = (editedAgendamentoData) => {
        axios.patch(`http://localhost:8005/atualizar-agendamento/${agendamentoIdAtual}`, editedAgendamentoData , auth)
            .then(() => {
                Swal.fire({
                    title: "Atualizado com sucesso!",
                    text: "As informações do agendamento foram atualizadas",
                    icon: "success",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
                fetchAgendamentos();
                setAgendamentoIdAtual("");
                MySwal.close();
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Erro em atualizar agendamento",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };

    const handleDelete = (agendamento) => {
        console.log(agendamento.id)
        Swal.fire({
            title: 'Tem certeza que deseja deletar este agendamento?',
            html: "Não será possível recuperar os dados depois",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ffb800',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar',
            iconColor: "#ffb800"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirmed(agendamento.id); // Passando o ID como argumento
            }
        });
    };

    const handleDeleteConfirmed = (agendamentoIdToDelete) => { // Recebendo o ID como argumento
        console.log(agendamentoIdToDelete); // Verificar se o ID está chegando corretamente
        axios.delete(`http://localhost:8005/deletar-agendamento/${agendamentoIdToDelete}`, auth)
            .then(() => {
                Swal.fire({
                    title: 'Agendamento deletado com sucesso!',
                    html: "",
                    icon: 'success',
                    iconColor: "#ffb800",
                    confirmButtonColor: "#FFB800"
                })
                fetchAgendamentos();
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Erro ao deletar agendamento",
                    text: "Ocorreu um erro ao tentar excluir o agendamento.",
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };

    return (
        <div className="col-md-11 p-3 min-vh-100 ">
            <div className="row justify-content-center  ">
                <div className="col-lg  ">
                    <div className="card bg-white border  shadow-lg border-3 rounded-3 bg-opacity-25">
                        <div className="card-body ">
                            <div className="row justify-content-center mb-4 ">
                                <div className="col-md-6  ">
                                    <h2 className="text-center mb-4">Agendamentos</h2>
                                    
                                    <a href="/calendario"><button className="btn input-group bt-cadastrar " type="button">Voltar para o calendário</button></a>
                                </div>
                            </div>
                            <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                                <table className="table bg-transparent   rounded-3 table-bordered table-fixed">
                                    <thead className="border-secondary  border-3 rounded-3">
                                        <tr>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Nome</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Descrição</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Email cliente</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Data</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-secondary border-3 rounded-3">
                                        {agendamentos.map(agendamento => (
                                            <tr key={agendamento._id}>
                                                <td className=" bg-transparent text-center">{agendamento.nome}</td>
                                                <td className=" bg-transparent text-center">{agendamento.descricao}</td>
                                                <td className=" bg-transparent text-center">{agendamento.email_convidado}</td>
                                                <td className=" bg-transparent text-center">{agendamento.data}</td>
                                                <td className="text-center bg-transparent d-flex justify-content-evenly">
                                                    <button
                                                        className="btn shadow-sm btn-primary mr-2 "
                                                        onClick={() => handleEdit(agendamento.id)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn shadow-sm btn-danger "
                                                        onClick={() => handleDelete(agendamento)}
                                                    >
                                                        Deletar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListarCalendarioTable;