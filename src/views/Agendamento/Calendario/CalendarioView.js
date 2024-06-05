import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Calendario from "../../../components/Agendamento/Calendario"
import Error from "../../../components/Error/Error"

function CalendarioView() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <Calendario></Calendario>
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
 


export default CalendarioView;

