import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import NovoClienteForm from "../../components/Cadastro/NovoClienteForm/NovoClienteForm";
import Error from "../../../src/components/Error/Error"

function CadastroClientes() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <NovoClienteForm></NovoClienteForm>
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

