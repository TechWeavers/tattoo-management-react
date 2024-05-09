import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./views/Login/Login";

import Dashboard from "./views/Dashboard/Dashboard";
import CadastroUsuario from "./views/CadastroUsuario/CadastroUsuario";
import CadastroEstoque from "./views/CadastroEstoque/CadastroEstoque";
import EsqueceuSenha from "./views/EsqueceuSenha/EsqueceuSenha";
import RedefinirSenha from "./views/RedefinirSenha/RedefinirSenha";
import ListarUsuario from "./views/ListarUsuario/ListarUsuario";
import ListarClientes from "./views/ListarClientes/ListarClientes";
import ListarMateriais from "./views/ListarMateriais/ListarMateriais"
import CadastroClientes from "./views/CadastroClientes/CadastroClientes";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />            
                    
          <Route path="/dashboard" element={<Dashboard />} />             
          <Route path="/novo-usuario" element={<CadastroUsuario />} />
          <Route path="/novo-estoque" element={<CadastroEstoque />} />
          <Route path="/novo-cliente" element={<CadastroClientes />} />
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />               
          <Route path="/redefinir-senha" element={<RedefinirSenhaWrapper />} />
          <Route path="/listar-usuario" element={<ListarUsuario />} /> 
          <Route path="/listar-clientes" element={<ListarClientes />} />  
          <Route path="/listar-materiais" element={<ListarMateriais />} />            
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

