import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoUsuarioForm from "../../components/Cadastro/NovoUsuarioForm/NovoUsuarioForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";

function CadastroUsuario() {
  return (
    <>
    <Navbar></Navbar>
    <div class="container my-0 mx-0">
        <div class="row">
    <Sidebar></Sidebar>
    <NovoUsuarioForm></NovoUsuarioForm>
    </div></div>
    </>
  );
}

export default CadastroUsuario;

