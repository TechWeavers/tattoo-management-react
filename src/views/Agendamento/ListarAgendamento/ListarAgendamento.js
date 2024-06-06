import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import ListarCalendarioTable from "../../../components/Agendamento/ListarCalendarioTable";
import Error from "../../../components/Error/Error"
import DarkMode from "../../../components/Darkmode/Darkmode";

function ListarAgendamento() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <ListarCalendarioTable></ListarCalendarioTable>
      </div>
      <DarkMode></DarkMode>
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

