import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./views/Login/Login";
import LoginSW from "./views/LoginSW/LoginSW";
import Dashboard from "./views/Dashboard/Dashboard";
import CadastroUsuario from "./views/CadastroUsuario/CadastroUsuario";
import EsqueceuSenha from "./views/EsqueceuSenha/EsqueceuSenha";
import RedefinirSenha from "./views/RedefinirSenha/RedefinirSenha";
import ListarUsuario from "./views/ListarUsuario/ListarUsuario";
import EditarUsuarioForm from "./components/EditarUsuarioForm/EditarUsuarioForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />            
          <Route path="/sw" element={<LoginSW />} />            
          <Route path="/dashboard" element={<Dashboard />} />             
          <Route path="/novo-usuario" element={<CadastroUsuario />} />
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />               
          <Route path="/redefinir-senha" element={<RedefinirSenhaWrapper />} />
          <Route path="/listar-usuario" element={<ListarUsuario />} />          
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

function RedefinirSenhaWrapper() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  return <RedefinirSenha token={token} />;
}

export default App;

