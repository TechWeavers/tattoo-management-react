import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditarUsuarioForm from "../../Editar/EditarUsuarioForm/EditarUsuarioForm";
import { useNavigate } from 'react-router-dom';
import EditarEstoqueForm from "../../Editar/EditarEstoqueForm/EditarEstoqueForm";

const MySwal = withReactContent(Swal);

function ListarUsuarioTable() {
    const [materiais, setMateriais] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [materialNomeAtual, setMaterialNomeAtual] = useState("");
    const [materialNomeToDelete, setMaterialNomeToDelete] = useState("");

    const navigate = useNavigate(); // Get the useNavigate hook
    const token = localStorage.getItem('token');
    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        fetchMateriais();
    }, []);

    const fetchMateriais = () => {
        axios.get("http://localhost:8004/listar-materiais", auth)
            .then(response => {
                if (response.data.materiais && Array.isArray(response.data.materiais)) {
                    setMateriais(response.data.materiais);
                } else {
                    console.log("Resposta inválida:", response.data);
                }
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (material) => {
        console.log(material.nome)
        axios.get(`http://localhost:8004/buscar-material/${material.nome}`, auth)
            .then(response => {
                MySwal.fire({
                    html: <EditarEstoqueForm 
                        material={response.data} 
                        handleSubmit={handleSubmit} 
                        materialNomeAtual={material.nome} 
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
                    title: "Erro ao atualizar material",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };
    

    const handleSubmit = (editedMaterialData) => {
        axios.patch(`http://localhost:8004/atualizar-material/${editedMaterialData.materialNomeAtual}`, editedMaterialData , auth)
            .then(() => {
                Swal.fire({
                    title: "Atualizado com sucesso!",
                    text: "As informações do material foram atualizadas",
                    icon: "success",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
                fetchMateriais();
                setMaterialNomeAtual("");
                MySwal.close();
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Erro em atualizar materiaaaaaaaaal",
                    text: err.response.data.detail,
                    icon: "error",
                    confirmButtonColor: "#FFB800",
                    iconColor: "#ffb800"
                });
            });
    };

    const handleDelete = (material) => {
        setMaterialNomeToDelete(material.nome); 
        Swal.fire({
            title: 'Tem certeza que deseja deletar este material?',
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
        const materialNome = materialNomeToDelete;
        axios.delete(`http://localhost:8004/deletar-material/${materialNome}`, auth)
        .then(() => {
            fetchMateriais();
        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                title: "Erro ao deletar material",
                text: err.response.data.detail,
                icon: "error",
                confirmButtonColor: "#FFB800",
                iconColor: "#ffb800"
            });
        });
    };

    const handleSearch = () => {
        axios.get(`http://localhost:8004/buscar-material/${searchTerm}`, auth)
            .then(response => {
                setMateriais(response.data);
            })
            .catch(err => {
                console.log(err);
                setMateriais([]);
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
                                    <h2 className="text-center mb-4">Estoque</h2>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control bg-transparent border-warning border-3"
                                            placeholder="Buscar materiais por nome"
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
                                    <a href="/novo-estoque"><button className="btn input-group bt-cadastrar " type="button">Cadastrar novo material</button></a>
                                </div>
                            </div>
                            <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                                <table className="table bg-transparent   rounded-3 table-bordered table-fixed">
                                    <thead className="border-secondary  border-3 rounded-3">
                                        <tr>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Nome</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Quantidade</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Valor unitário</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Data de atualização</th>
                                            <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-secondary border-3 rounded-3">
                                        {materiais.map(material => (
                                            <tr key={material._id}>
                                                <td className=" bg-transparent text-center">{material.nome}</td>
                                                <td className=" bg-transparent text-center">{material.quantidade}</td>
                                                <td className=" bg-transparent text-center">{material.valor_unitario}</td>
                                                <td className=" bg-transparent text-center">{material.data_atualizacao}</td>
                                                <td className="text-center bg-transparent d-flex justify-content-evenly">
                                                    <button 
                                                        className="btn shadow-sm btn-primary mr-2 " 
                                                        onClick={() => handleEdit(material)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className="btn shadow-sm btn-danger " 
                                                        onClick={() => handleDelete(material)}
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
