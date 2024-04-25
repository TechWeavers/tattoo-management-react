import React, { useState } from 'react';
import axios from 'axios';
import './NovoUsuarioForm.min.css';

function NovoUsuarioForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/novo-usuario', {
                username,
                email,
                password
            });
            alert('Usuário cadastrado com sucesso!');
            // Limpar os campos do formulário após o envio bem-sucedido
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
        }
    };

    return ( <
        section className = "position-relative py-4 py-xl-5" >
        <
        div className = "container position-relative" >
        <
        div className = "row d-flex justify-content-center" >
        <
        div className = "col-md-8 col-lg-6 col-xl-5 col-xxl-4" >
        <
        div className = "card mb-5" >
        <
        div className = "card-body p-sm-5" >
        <
        h2 className = "text-center mb-4" > Cadastro de Usuário < /h2> <
        form onSubmit = { handleSubmit } >
        <
        div className = "mb-3" >
        <
        input className = "form-control"
        type = "text"
        id = "username"
        name = "username"
        placeholder = "Nome de Usuário"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value)
        }
        /> < /
        div > <
        div className = "mb-3" >
        <
        input className = "form-control"
        type = "email"
        id = "email"
        name = "email"
        placeholder = "Email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value)
        }
        /> < /
        div > <
        div className = "mb-3" >
        <
        input className = "form-control"
        type = "password"
        id = "password"
        name = "password"
        placeholder = "Senha"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        /> < /
        div > <
        div >
        <
        button className = "btn btn-primary d-block w-100"
        type = "submit" >
        Cadastrar <
        /button> < /
        div > <
        /form> < /
        div > <
        /div> < /
        div > <
        /div> < /
        div > <
        /section>
    );
}

export default NovoUsuarioForm;