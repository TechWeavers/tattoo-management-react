import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import LoginSW from "./views/LoginSW/LoginSW";
import Dashboard from "./views/Dashboard/Dashboard";
import CadastroUsuario from "./views/CadastroUsuario/CadastroUsuario";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />            
          <Route path="/sw" element={<LoginSW />} />            
          <Route path="/dashboard" element={<Dashboard />} />            
          <Route path="/novo-usuario" element={<CadastroUsuario />} />            
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;

