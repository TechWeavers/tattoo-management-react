import DarkMode from "../../components/Darkmode/Darkmode";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ListarMateriaisTable from "../../components/Listar/ListarEstoqueTable/ListarEstoqueTable";
import Error from "../../components/Error/Error"

function ListarClientes() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      <div class="row ">
      <Sidebar></Sidebar>
      <ListarMateriaisTable></ListarMateriaisTable>
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
