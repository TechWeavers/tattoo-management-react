import Navbar from "../../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Calendario from "../../../components/Agendamento/Calendario"
import Error from "../../../components/Error/Error"
import DarkMode from "../../../components/Darkmode/Darkmode";

function CalendarioView() {

  if(localStorage.getItem('token')){
    return (
      <>
      <Navbar></Navbar>
      
          <div class="row">
      <Sidebar></Sidebar>
      <Calendario></Calendario>
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
 


export default CalendarioView;

