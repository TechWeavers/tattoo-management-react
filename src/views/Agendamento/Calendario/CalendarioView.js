import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Calendario from "../../../components/Agendamento/Calendario"

function CalendarioView() {
  return (
    <>
    <Navbar></Navbar>
    
        <div class="row">
    <Sidebar></Sidebar>
    <Calendario></Calendario>
    </div>
    </>
  );
}

export default CalendarioView;

