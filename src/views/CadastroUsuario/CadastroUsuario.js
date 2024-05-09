import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoUsuarioForm from "../../components/Cadastro/NovoUsuarioForm/NovoUsuarioForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";

function CadastroUsuario() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <NovoUsuarioForm></NovoUsuarioForm>
    </div>
    </>
  );
}

export default CadastroUsuario;

