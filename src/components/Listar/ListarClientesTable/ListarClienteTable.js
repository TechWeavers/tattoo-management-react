import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditarUsuarioForm from "../../Editar/EditarUsuarioForm/EditarUsuarioForm";
import { useNavigate } from 'react-router-dom';
import './ListarUsuarioTable.css'

const MySwal = withReactContent(Swal);

function ListarClienteTable() {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userCpfAtual, setUserCpfAtual] = useState("");
    const [userCpfToDelete, setUserCpfToDelete] = useState("");

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
        axios.get("http://localhost:8001/listar-clientes", auth)
            .then(response => {
                if (response.data.clientes && Array.isArray(response.data.clientes)) {
                    setClientes(response.data.clientes);
                } else {
                    console.log("Resposta inválida:", response.data);
                }
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (userData) => {
        setUserEmailAtual(userData.email); // Atualize o estado diretamente aqui
        axios.get(`http://localhost:8001/buscar-usuario/${userData.email}`, auth)
            .then(response => {
                MySwal.fire({
                    html: <EditarUsuarioForm 
                        user={response.data} 
                        handleSubmit={handleSubmit} 
                        userEmailAtual={userData.email} 
                    />,
                    customClass: {
                        container: 'my-swal-container',
                        popup: 'my-swal-popup',
                        content: 'my-swal-content',
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-secondary'
                    },
                    showConfirmButton: false // Remove the "OK" button
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
    

    const handleSubmit = (editedUserData) => {
        axios.patch(`http://localhost:8001/atualizar-cliente/${userCpfAtual}`, editedUserData , auth)
            .then(() => {
                Swal.fire({
                    title: "Atualizado com sucesso!",
                    text: "As informações do cliente foram atualizadas",
                    icon: "success",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
                fetchClientes();
                setUserCpfAtual("");
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

    const handleDelete = (user) => {
        setUserCpfToDelete(user.cpf); 
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
                handleDeleteConfirmed();
            }
        });
    };

    const handleDeleteConfirmed = () => {
        const userCpf = userEmailToDelete;
        axios.delete(`http://localhost:8001/deletar-cliente/${userCpf}`, auth)
        .then(() => {
            fetchClientes();
        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                title: "Erro ao atualizar cliente",
                text: err.response.data.detail,
                icon: "error",
                confirmButtonColor: "#FFB800",
                iconColor: "#ffb800"
            });
        });
    };

    const handleSearch = () => {
        axios.get(`http://localhost:8001/buscar-cliente/${searchTerm}`, auth)
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
       <div className="col-lg-10 p-3 min-vh-100 ms-auto">
            <div className="row justify-content-center  ">
                <div className="col-lg  ">
                    <div className="card bg-white border border-warning border-3 rounded-3 bg-opacity-25">
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
                                                        className="btn btn-primary mr-2" 
                                                        onClick={() => handleFicha(cliente)}
                                                    >
                                                        Ver Ficha
                                                    </button>
                                                    <button 
                                                        className="btn  btn-primary mr-2 " 
                                                        onClick={() => handleEdit(cliente.cpf)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger " 
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

export default ListarClienteTable;
