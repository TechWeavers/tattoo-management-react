import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import NovoAgendamentoForm from "../../../components/Agendamento/NovoAgendamentoForm";
import DarkMode from "../../../components/Darkmode/Darkmode";

function ListarAgendamento() {
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
}

export default ListarAgendamento;

