import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

function ListarUsuario() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token')
    const auth = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    useEffect(() => {
        axios.get("http://localhost:8001/listar-usuarios")
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, [auth]);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="listar-usuario">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Função</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListarUsuario;