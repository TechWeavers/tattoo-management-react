import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListarUsuarioTable from "../../components/ListarUsuarioTable/ListarUsuarioTable";

function ListarUsuario() {
    return (
        <>
        <Navbar></Navbar>
        
        <div class="row ">
        <Sidebar></Sidebar>
        <ListarUsuarioTable></ListarUsuarioTable>
        </div>
        </>
      );
}

export default ListarUsuario;
