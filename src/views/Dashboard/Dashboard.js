import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar"
import './Dashboard.css'; 

function Dashboard() {

  
  


  return (
    <>
      <Navbar></Navbar> 

      <div class="container">
        <div>
          <div class="container d-flex justify-content-center mt-5">
            <div class="col-md-6">
              <div class="card shadow-lg rounded-3">
                <div class="card-body">
                  <h5 class="card-title text-center">Cima esquerda</h5>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card shadow-lg rounded-3">
                <div class="card-body">
                  <h5 class="card-title text-center">Cima direita</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div class="container d-flex justify-content-center mt-3">
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card shadow-lg rounded-3">
                <div class="card-body">
                  <h5 class="card-title text-center">Baixo esquerda</h5>
                  
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card shadow-lg rounded-3">
                <div class="card-body">
                  <h5 class="card-title text-center">Baixo meio</h5>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card shadow-lg rounded-3">
                <div class="card-body">
                  <h5 class="card-title text-center">Baixo </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        
      </div>

      


      <div className="row">
        <Sidebar></Sidebar> 
      </div>
    </>
  );
}

export default Dashboard;

