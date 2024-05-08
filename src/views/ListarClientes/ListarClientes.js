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
          </div>
          </>
        );
  }

  export default ListarClientes;
