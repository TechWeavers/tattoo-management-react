import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditarClienteForm from "../../Editar/EditarClienteForm/EditarClienteForm";
import { useNavigate } from 'react-router-dom';
import EditarFicha from '../../Editar/EditarFicha/EditarFicha'

const MySwal = withReactContent(Swal);

function ListarClientesTable() {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [clienteCpfAtual, setClienteCpfAtual] = useState("");


    const navigate = useNavigate(); // Get the useNavigate hook
    const token = localStorage.getItem('token');
    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = () => {
        axios.get("http://localhost:8003/listar-clientes", auth)
            .then(response => {
                if (response.data.clientes && Array.isArray(response.data.clientes)) {
                    setClientes(response.data.clientes);
                } else {
                    console.log("Resposta inválida:", response.data);
                }
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (clienteData) => {
        console.log(clienteData.cpf); // Atualize o estado diretamente aqui
        axios.get(`http://localhost:8003/buscar-cliente/${clienteData.cpf}`, auth)
            .then(response => {
                setClienteCpfAtual(clienteData.cpf);
                MySwal.fire({
                    html: <EditarClienteForm 
                        user={response.data} 
                        handleSubmit={handleSubmit} 
                        clienteCpfAtual={clienteData.cpf} 
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
                    title: "Erro ao atualizar usuário",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };

    const handleEditFicha = (clienteData) => {
        console.log(clienteData.cpf); // Atualize o estado diretamente aqui
        axios.get(`http://localhost:8003/buscar-cliente/${clienteData.cpf}`, auth)
            .then(response => {
                setClienteCpfAtual(clienteData.cpf);
                MySwal.fire({
                    html: <EditarFicha 
                        user={response.data} 
                        handleSubmit={handleSubmit} 
                        clienteCpfAtual={clienteData.cpf} 
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
                    title: "Erro ao atualizar usuário",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };
    

    const handleSubmit = (editedClienteData) => {
        axios.patch(`http://localhost:8003/atualizar-cliente/${clienteCpfAtual}`, editedClienteData , auth)
            .then(() => {
                Swal.fire({
                    title: "Atualizado com sucesso!",
                    text: "As informações do cliente foram atualizadas",
                    icon: "success",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
                fetchClientes();
                setClienteCpfAtual("");
                MySwal.close();
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Erro em atualizar cliente",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };

    const handleDelete = (cliente) => {
        console.log(cliente.cpf)
        Swal.fire({
            title: 'Tem certeza que deseja deletar este cliente?',
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
                handleDeleteConfirmed(cliente.cpf); // Passando o CPF como argumento
            }
        });
    };
    const handleDeleteConfirmed = (clienteCpfToDelete) => { // Recebendo o CPF como argumento
        console.log(clienteCpfToDelete); // Verificar se o CPF está chegando corretamente
        axios.delete(`http://localhost:8003/deletar-cliente/${clienteCpfToDelete}`, auth)
            .then(() => {
                Swal.fire({
                    title: 'Cliente deletado com sucesso!',
                    html: "",
                    icon: 'success',
                    iconColor: "#ffb800",
                    confirmButtonColor: "#FFB800"
                })
                fetchClientes();
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Erro ao deletar cliente",
                    text: "Ocorreu um erro ao tentar excluir o cliente.",
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };
    
    

    const handleSearch = () => {
        axios.get(`http://localhost:8003/buscar-cliente/${searchTerm}`, auth)
            .then(response => {
                setClientes(response.data);
            })
            .catch(err => {
                console.log(err);
                setClientes([]);
            });
    };

    const handleFicha = () => {

    }

    return (
        <div className="col-md-11 p-3 min-vh-100 ">
            <div className="row justify-content-center  ">
                <div className="col-lg  ">
                    <div className="card bg-white border  shadow-lg border-3 rounded-3 bg-opacity-25">

                        <div className="card-body ">
                            <div className="row justify-content-center mb-4 ">
                                <div className="col-md-6  ">
                                    <h2 className="text-center mb-4">Banco de clientes</h2>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control bg-transparent border-warning border-3"
                                            placeholder="Buscar clientes por CPF"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            className="btn btn-primary fw-normal"

                                            type="button"
                                            onClick={handleSearch}
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                    <br />
                                    <button className="btn input-group bt-cadastrar " type="button"><a href="/novo-cliente">Cadastrar novo cliente</a></button>
                                </div>
                            </div>
                            <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                                <table className="table bg-transparent   rounded-3 table-bordered table-fixed">
                                    <thead className="border-secondary  border-3 rounded-3">
                                        <tr>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Nome</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">CPF</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Email</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Telefone</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-secondary border-3 rounded-3">
                                        {clientes.map(cliente => (
                                            <tr key={cliente._id}>
                                                <td className=" bg-transparent text-center">{cliente.nome}</td>
                                                <td className=" bg-transparent text-center">{cliente.cpf}</td>
                                                <td className=" bg-transparent text-center">{cliente.email}</td>
                                                <td className=" bg-transparent text-center">{cliente.telefone}</td>
                                                <td className="text-center bg-transparent d-flex justify-content-evenly">
                                                    <button
                                                        className="btn shadow-sm btn-primary mr-2"

                                                        onClick={() => handleEditFicha(cliente)}
                                                    >
                                                        Ver Ficha
                                                    </button>

                                                    <button
                                                        className="btn shadow-sm btn-primary mr-2 "
                                                        onClick={() => handleEdit(cliente.cpf)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="btn shadow-sm btn-danger "

                                                        onClick={() => handleDelete(cliente)}
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

export default ListarClientesTable;
