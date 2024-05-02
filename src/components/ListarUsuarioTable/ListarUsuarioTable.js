import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditarUsuarioForm from "../../components/EditarUsuarioForm/EditarUsuarioForm";
import { useNavigate } from 'react-router-dom';
import './ListarUsuarioTable.css'

const MySwal = withReactContent(Swal);

function ListarUsuarioTable() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingUserId, setEditingUserId] = useState(null); // Estado para armazenar o ID do usuário que está sendo editado
    const [editingUser, setEditingUser] = useState(null); // Estado para armazenar os dados do usuário que está sendo editado
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
        // Abre o alerta com o formulário de edição
        //setEditingUserId(userEmail);
        axios.get(`http://localhost:8001/buscar-usuario/${userEmail}`,auth)
            .then(response => {
                //setEditingUser(response.data);
                //navigate('/EditarUsuarioForm');
                MySwal.fire({
                    html: <EditarUsuarioForm user={response.data} handleSubmit={handleSubmit} />,
                    customClass: {
                        container: 'my-swal-container',
                        popup: 'my-swal-popup',
                        content: 'my-swal-content',
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-secondary'
                    },
                    showConfirmButton: false // Remover o botão "OK"
                });
            })
            .catch(err => {
                console.log(err);
                console.log(err);
                Swal.fire({
                    title: "Erro ao atualizar usuário",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
                //setUsers([]);
            });
    };

    const handleSubmit = (editedUserData) => {
        axios.patch(`http://localhost:8001/atualizar-usuario`, {editedUserData}, auth)
            .then(() => {
                Swal.fire({
                    title: "Atualizado com sucesso!",
                    text: "As informações do usuário foram atualizadas",
                    icon: "success",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
                fetchUsers();
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
        const userEmail = user.email; // Extrair o e-mail do usuário
        axios.delete(`http://localhost:8001/deletar-usuario/${userEmail}`, auth)
            .then(() => {
                // Após a exclusão bem-sucedida, buscar a lista atualizada de usuários
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
                //setUsers([]);
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
       <div className="col-sm p-3 min-vh-100 ms-auto">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-center mb-4">
                                <div className="col-md-6">
                                    <h2 className="text-center mb-4">Listar Usuários</h2>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar usuários por email"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button 
                                            className="btn btn-primary botao" 
                                            type="button"
                                            onClick={handleSearch}
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                    <br />
                                    <button className="btn  bt-cadastrar botao" type="button"><a href="/novo-usuario">Cadastrar novo usuário</a></button>
                                </div>
                            </div>
                            <div className="table-responsive" style={{ maxHeight: '400px' }}>
                                <table className="table table-bordered table-fixed">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Função</th>
                                            <th scope="col" className="text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.tipo}</td>
                                                <td className="text-center">
                                                    <button 
                                                        className="btn btn-primary mr-2 botao" 
                                                        onClick={() => handleEdit(user.email)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger botao" 
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
