import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import NovoAgendamentoForm from "../../../components/Agendamento/NovoAgendamentoForm";

function ListarAgendamento() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <NovoAgendamentoForm></NovoAgendamentoForm>
    </div>
    </>
  );
}

export default ListarAgendamento;

