  import DarkMode from "../../components/Darkmode/Darkmode";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
  import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
  import ListarClientesTable from "../../components/Listar/ListarClientesTable/ListarClientesTable";

  function ListarClientes() {
      return (
          <>
          <Navbar></Navbar>
          
          <div class="row ">
          <Sidebar></Sidebar>
          <ListarClientesTable></ListarClientesTable>
          <DarkMode></DarkMode>
          </div>
          </>
        );
  }

  export default ListarClientes;
