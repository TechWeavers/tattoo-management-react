import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoUsuarioForm from "../../components/Cadastro/NovoUsuarioForm/NovoUsuarioForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import DarkMode from "../../components/Darkmode/Darkmode";

function CadastroUsuario() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <NovoUsuarioForm></NovoUsuarioForm>
    </div>

    <DarkMode></DarkMode>
    </>
  );
}

export default CadastroUsuario;

