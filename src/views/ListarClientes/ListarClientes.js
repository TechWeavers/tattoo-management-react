  import DarkMode from "../../components/Darkmode/Darkmode";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
  import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
  import ListarClientesTable from "../../components/Listar/ListarClientesTable/ListarClientesTable";
  import Error from "../../components/Error/Error"

  function ListarClientes() {

    if(localStorage.getItem('token')){
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
    }else{
      return (
        <>
          <Error></Error>
        </>
      );
    }
      
  }

  export default ListarClientes;
