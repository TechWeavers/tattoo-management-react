import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListarUsuarioTable from "../../components/ListarUsuarioTable/ListarUsuarioTable";

function ListarUsuario() {
    return (
        <>
        <Navbar></Navbar>
        <div class="container my-0 mx-0">
        <div class="row">
        <Sidebar></Sidebar>
        <ListarUsuarioTable></ListarUsuarioTable>
        </div></div>
        </>
      );
}

export default ListarUsuario;
