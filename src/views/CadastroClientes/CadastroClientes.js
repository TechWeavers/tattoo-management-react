import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import NovoClienteForm from "../../components/Cadastro/NovoClienteForm/NovoClienteForm";
import DarkMode from "../../components/Darkmode/Darkmode";

function CadastroClientes() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <NovoClienteForm></NovoClienteForm>
    </div>
    <DarkMode></DarkMode>
    </>
  );
}

export default CadastroClientes;

