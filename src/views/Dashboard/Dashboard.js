import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
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

