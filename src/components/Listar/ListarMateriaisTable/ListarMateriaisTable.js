import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditarMateriais from "../../Editar/EditarMateriaisForm";


const MySwal = withReactContent(Swal);

function ListarMateriaisTable({
    const [materiais, setMateriais] = useState([]);


    useEffect (() => {
        async function fetchMaterials() {
          const fetchedMaterials = await MaterialService.getMaterials(); // Fetch data from service
          setMaterials(fetchedMaterials);
        };
    
        const fetchMaterials = () => {
            axios.get("http://localhost:8001/listar-materiais", auth)
                .then(response => {
                    if (response.data.users && Array.isArray(response.data.users)) {
                        setUsers(response.data.users);
                    } else {
                        console.log("Resposta inválida:", response.data);
                    }
                })
                .catch(err => console.log(err));
        };

        const handleEdit = (material.name) => {
            setUserEmailAtual(material.name); // Atualize o estado diretamente aqui
            axios.get(`http://localhost:8001/buscar-material/${materialName}`, auth)
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

        const handleDelete = async (id) => {
            await MaterialService.deleteMaterial(id);
            const remainingMaterials = materials.filter((material) => material.id !== id);
            setMaterials(remainingMaterials);
        };


    });

});



return(
    <div className="col-lg-10 p-3 min-vh-100 ms-auto">
        <div className="row justify-content-center  ">
            <div className="col-lg  ">
                <div className="card bg-white border border-warning border-3 rounded-3 bg-opacity-25">
                    <div className="card-body ">
                        <div className="row justify-content-center mb-4 ">
                            <div className="col-md-6  ">
                                <h2 className="text-center mb-4">Banco de Materiais</h2>
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
                                <a href="/novo-material"><button className="btn input-group bt-cadastrar " type="button">Cadastrar novo Material</button></a>
                            </div>
                        </div>
                        <div className="table-responsive rounded-3" style={{ maxHeight: '400px' }}>
                            <table className="table bg-transparent   rounded-3 table-bordered table-fixed">
                                <thead className="border-secondary  border-3 rounded-3">
                                    <tr>
                                        <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Id</th>
                                        <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Nome</th>
                                        <th scope="col" className=" bg-secondary bg-opacity-10 text-center">Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody className="border-secondary border-3 rounded-3">
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td className=" bg-transparent text-center">{material.id}</td>
                                            <td className=" bg-transparent text-center">{material.name}</td>
                                            <td className=" bg-transparent text-center">{material.qtd}</td>
                                            <td className="text-center bg-transparent d-flex justify-content-evenly">
                                                <button 
                                                    className="btn  btn-primary mr-2 " 
                                                    onClick={() => handleEdit(material.name)}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    className="btn btn-danger " 
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


export default ListarMateriaisTable;
