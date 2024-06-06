import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ListarUsuarioTable from "../../components/Listar/ListarUsuarioTable/ListarUsuarioTable";
import Error from "../../components/Error/Error"

function ListarUsuario() {

  if(localStorage.getItem('token')){

    return (
      <>
      <Navbar></Navbar>
      
      <div class="row ">
      <Sidebar></Sidebar>
      <ListarUsuarioTable></ListarUsuarioTable>
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

export default ListarUsuario;
