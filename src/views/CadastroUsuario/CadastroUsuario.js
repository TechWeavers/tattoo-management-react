import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NovoUsuarioForm from "../../components/Cadastro/NovoUsuarioForm/NovoUsuarioForm";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import DarkMode from "../../components/Darkmode/Darkmode";
import Error from "../../components/Error/Error"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CadastroUsuario() {

  const [tipo, setTipo] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('token')
    
    const carregarAtributo = async () => {
      try {

          const response = await axios.get(`http://localhost:8000/tipo-usuario/${token}`);

          // Extrair o atributo da resposta
          const tipoExtraido = response.data;

          // Atualizar o estado com o atributo extraído
          setTipo(tipoExtraido);
      } catch (error) {
          console.error('Erro ao carregar atributo:', error);
      }
  };

  carregarAtributo();
  },[]);

  if(localStorage.getItem('token')){
    if(tipo=="Administrador"){
      return (
        <>
        <Navbar></Navbar>
        
            <div class="row">
        <Sidebar></Sidebar>
        <NovoUsuarioForm></NovoUsuarioForm>
        <DarkMode></DarkMode>
        </div>
        </>
      );
    }
    else{
      return (
        <>
          <Error></Error>
        </>
      );
    }
  }else{
    return (
      <>
        <Error></Error>
      </>
    );
  }
  
}

export default CadastroUsuario;

