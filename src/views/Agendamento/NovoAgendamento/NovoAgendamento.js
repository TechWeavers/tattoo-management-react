import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import NovoAgendamentoForm from "../../../components/Agendamento/NovoAgendamentoForm";
import Error from "../../../components/Error/Error"
import DarkMode from "../../../components/Darkmode/Darkmode";

function ListarAgendamento() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <NovoAgendamentoForm></NovoAgendamentoForm>
      <DarkMode></DarkMode>
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

export default ListarAgendamento;

