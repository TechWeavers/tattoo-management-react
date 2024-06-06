import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import NovoClienteForm from "../../components/Cadastro/NovoClienteForm/NovoClienteForm";
import Error from "../../../src/components/Error/Error"
import DarkMode from "../../components/Darkmode/Darkmode";

function CadastroClientes() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <NovoClienteForm></NovoClienteForm>
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

export default CadastroClientes;

