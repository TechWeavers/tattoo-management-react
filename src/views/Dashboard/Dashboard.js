import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar"
import './Dashboard.css'; 

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default Dashboard;

