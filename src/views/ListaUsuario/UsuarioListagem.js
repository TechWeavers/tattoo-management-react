import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

function UsuariosListagem() {
  const [usuarios, setUsuarios] = useState([]); // Armazena a lista de usuários

  useEffect(() => {
    // Buscar usuários do banco de dados ou API aqui
    useEffect(() => {
      const buscarUsuarios = async () => {
        const response = await axios.get('https://sua-api.com/usuarios');
        const usuariosCadastrados = response.data;
        setUsuarios(usuariosCadastrados);
      };
    
      buscarUsuarios();
    }, []);
    
    setUsuarios(usuariosCadastrados);
  }, []); // Executa apenas na primeira renderização

  return (
    <div>
      <Sidebar></Sidebar>
      <Navbar></Navbar>
      <h1>Listagem de Usuários</h1>
      <ListaUsuarios usuarios={usuarios} />
    </div>
  );
}

export default UsuariosListagem;
