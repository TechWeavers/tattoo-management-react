import Navbar from "../../components/Navbar/Navbar";
//import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

function ListarUsuario() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const auth = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    useEffect(() => {
      axios.get("http://localhost:8001/listar-usuarios", auth)
        .then(response => setUsers(response.data))
        .catch(err => console.log(err));
    }, []); // <- Coloque os parênteses aqui para indicar que é uma dependência vazia

    return (
        <>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <ListarUsuarioTable></ListarUsuarioTable>
        </>
      );
}

export default ListarUsuario;
