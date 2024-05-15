import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import ListarCalendarioTable from "../../../components/Agendamento/ListarCalendarioTable";

function ListarAgendamento() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <ListarCalendarioTable></ListarCalendarioTable>
    </div>
    </>
  );
}

export default ListarAgendamento;

