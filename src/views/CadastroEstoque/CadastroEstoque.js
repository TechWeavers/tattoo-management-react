import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoEstoqueForm from "../../components/Cadastro/NovoEstoqueForm/NovoEstoqueForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";

function CadastroEstoque() {
  return (
    <>
    <Navbar></Navbar>
    <div class="container my-0 mx-0">
        <div class="row">
    <Sidebar></Sidebar>
    <NovoEstoqueForm></NovoEstoqueForm>
    </div></div>
    </>
  );
}

export default CadastroEstoque;

