import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar"
import './Dashboard.css'; 

function Dashboard() {
  return (
    <>
     <Navbar></Navbar> 
      <div className="row">
     <Sidebar></Sidebar> 
    </div>
    </>
  );
}

export default Dashboard;

