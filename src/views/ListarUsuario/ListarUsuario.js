import DarkMode from "../../components/Darkmode/Darkmode";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ListarUsuarioTable from "../../components/Listar/ListarUsuarioTable/ListarUsuarioTable";

function ListarUsuario() {
    return (
        <>
        <Navbar></Navbar>
        
        <div class="row ">
        <Sidebar></Sidebar>
        <ListarUsuarioTable></ListarUsuarioTable>
        <DarkMode></DarkMode>
        </div>
        </>
        
      );
}

export default ListarUsuario;
