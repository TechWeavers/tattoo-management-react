import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoEstoqueForm from "../../components/Cadastro/NovoEstoqueForm/NovoEstoqueForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Error from "../../components/Error/Error"

function CadastroEstoque() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <NovoEstoqueForm></NovoEstoqueForm>
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

export default CadastroEstoque;

