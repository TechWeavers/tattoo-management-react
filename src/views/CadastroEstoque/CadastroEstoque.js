import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoEstoqueForm from "../../components/Cadastro/NovoEstoqueForm/NovoEstoqueForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import DarkMode from "../../components/Darkmode/Darkmode";

function CadastroEstoque() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <NovoEstoqueForm></NovoEstoqueForm>
    
    </div>
    <DarkMode></DarkMode>
    </>
  );
}

export default CadastroEstoque;

