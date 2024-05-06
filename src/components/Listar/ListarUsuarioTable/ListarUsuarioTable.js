import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditarUsuarioForm from "../../Editar/EditarUsuarioForm/EditarUsuarioForm";
import { useNavigate } from 'react-router-dom';
import './ListarUsuarioTable.css'

const MySwal = withReactContent(Swal);

function ListarUsuarioTable() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userEmailAtual, setUserEmailAtual] = useState("");
    const [userEmailToDelete, setUserEmailToDelete] = useState("");

    const navigate = useNavigate(); // Get the useNavigate hook
    const token = localStorage.getItem('token');
    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:8001/listar-usuarios", auth)
            .then(response => {
                if (response.data.users && Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    console.log("Resposta inválida:", response.data);
                }
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (userEmail) => {
        setUserEmailAtual(userEmail); // Atualize o estado diretamente aqui
        axios.get(`http://localhost:8001/buscar-usuario/${userEmail}`, auth)
            .then(response => {
                MySwal.fire({
                    html: <EditarUsuarioForm 
                        user={response.data} 
                        handleSubmit={handleSubmit} 
                        userEmailAtual={userEmail} 
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
        axios.patch(`http://localhost:8001/atualizar-usuario/${userEmailAtual}`, editedUserData , auth)
            .then(() => {
                Swal.fire({
                    title: "Atualizado com sucesso!",
                    text: "As informações do usuário foram atualizadas",
                    icon: "success",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
                fetchUsers();
                setUserEmailAtual("");
                MySwal.close();
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Erro em atualizar usuário",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };

    const handleDelete = (user) => {
        setUserEmailToDelete(user.email); // Salvando o email do usuário a ser deletado
        Swal.fire({
            title: 'Tem certeza que deseja deletar este usuário?',
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
        const userEmail = userEmailToDelete;
        axios.delete(`http://localhost:8001/deletar-usuario/${userEmail}`, auth)
        .then(() => {
            fetchUsers();
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

    const handleSearch = () => {
        axios.get(`http://localhost:8001/buscar-usuario/${searchTerm}`, auth)
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => {
                console.log(err);
                setUsers([]);
            });
    };

    return (
       <div className="col-lg-10 p-3 min-vh-100 ms-auto">
            <div className="row justify-content-center  ">
                <div className="col-lg  ">
                    <div className="card bg-white border border-warning border-3 rounded-3 bg-opacity-25">
                        <div className="card-body ">
                            <div className="row justify-content-center mb-4 ">
                                <div className="col-md-6  ">
                                    <h2 className="text-center mb-4">Banco de usuários</h2>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control bg-transparent border-warning border-3"
                                            placeholder="Buscar usuários por email"
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
                                    <a href="/novo-usuario"><button className="btn input-group bt-cadastrar " type="button">Cadastrar novo usuário</button></a>
                                </div>
                            </div>
                            <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                                <table className="table bg-transparent   rounded-3 table-bordered table-fixed">
                                    <thead className="border-secondary  border-3 rounded-3">
                                        <tr>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Nome</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Email</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Função</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-secondary border-3 rounded-3">
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td className=" bg-transparent text-center">{user.name}</td>
                                                <td className=" bg-transparent text-center">{user.email}</td>
                                                <td className=" bg-transparent text-center">{user.tipo}</td>
                                                <td className="text-center bg-transparent d-flex justify-content-evenly">
                                                    <button 
                                                        className="btn  btn-primary mr-2 " 
                                                        onClick={() => handleEdit(user.email)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger " 
                                                        onClick={() => handleDelete(user)}
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

export default ListarUsuarioTable;
