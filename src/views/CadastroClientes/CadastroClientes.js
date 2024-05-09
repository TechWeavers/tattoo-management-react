import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import NovoClienteForm from "../../components/Cadastro/NovoClienteForm/NovoClienteForm";

function CadastroClientes() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <NovoClienteForm></NovoClienteForm>
    </div>
    </>
  );
}

export default CadastroClientes;

