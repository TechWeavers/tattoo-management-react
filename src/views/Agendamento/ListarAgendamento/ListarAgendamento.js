import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import ListarCalendarioTable from "../../../components/Agendamento/ListarCalendarioTable";
import Error from "../../../components/Error/Error"

function ListarAgendamento() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <ListarCalendarioTable></ListarCalendarioTable>
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

