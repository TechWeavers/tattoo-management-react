import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoUsuarioForm from "../../components/Cadastro/NovoUsuarioForm/NovoUsuarioForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Error from "../../components/Error/Error"

function CadastroUsuario() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <NovoUsuarioForm></NovoUsuarioForm>
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

export default CadastroUsuario;

