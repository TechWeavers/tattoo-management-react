import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListarUsuarioTable from "../../components/ListarUsuarioTable/ListarUsuarioTable";

function ListarUsuario() {
    return (
        <>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <ListarUsuarioTable></ListarUsuarioTable>
        </>
      );
}

export default ListarUsuario;
