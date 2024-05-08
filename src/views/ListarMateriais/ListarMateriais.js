import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ListarMateriaisTable from "../../components/Listar/ListarEstoqueTable/ListarEstoqueTable";

function ListarClientes() {
    return (
        <>
        <Navbar></Navbar>
        
        <div class="row ">
        <Sidebar></Sidebar>
        <ListarMateriaisTable></ListarMateriaisTable>
        </div>
        </>
      );
}

export default ListarClientes;
