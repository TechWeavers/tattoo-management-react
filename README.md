### Passo 1: Criando o projeto React

1. Abrir o terminal.
2. Executar o comando:

```bash
npx create-react-app tattoo-management-react
```

Este comando cria uma nova pasta chamada `tattoo-management-react` com uma estrutura básica de projeto React.

### Passo 2: Instalando o React Router DOM

1. Navegar até o diretório do projeto:

```bash
cd tattoo-management-react
```

2. Instalar o React Router DOM:

```bash
npm install react-router-dom
```

### Passo 3: Instalar o Axios

1. Ainda no diretório do projeto, instale o Axios:

```bash
npm install axios
```

### Resumo das Dependências

- `react`: Biblioteca principal do React.
- `react-dom`: Responsável pela renderização do React no DOM.
- `react-scripts`: Conjunto de scripts para iniciar, testar e criar builds da aplicação React.
- `react-router-dom`: Biblioteca para roteamento de páginas no React.
- `axios`: Cliente HTTP para fazer requisições para uma API.

### Estrutura do Projeto

- **src/**: Pasta que contém todo o código-fonte da aplicação.
  - **components/**: Pasta para armazenar componentes reutilizáveis.
    - **Navbar/**: Componente de barra de navegação.
      - `Navbar.js`: Código JavaScript do componente Navbar.
      - `Navbar.css`: Estilos CSS específicos do Navbar.
    - **Sidebar/**: Componente de barra lateral.
      - `Sidebar.js`: Código JavaScript do componente Sidebar.
      - `Sidebar.css`: Estilos CSS específicos do Sidebar.
  - **views/**: Pasta para armazenar as diferentes visualizações da aplicação.
    - **Dashboard/**: Visualização do painel de controle.
      - `Dashboard.js`: Código JavaScript da visualização Dashboard.
      - `Dashboard.css`: Estilos CSS específicos do Dashboard.
    - **Login/**: Visualização da página de login.
      - `Login.js`: Código JavaScript da visualização Login.
      - `Login.css`: Estilos CSS específicos do Login.
    - **LoginSW/**: Visualização da página de login de um usuário comum.
      - `LoginSW.js`: Código JavaScript da visualização LoginSW.
      - `LoginSW.css`: Estilos CSS específicos do LoginSW.
  - `App.js`: Arquivo principal que contém o componente raiz da aplicação.
  - `index.js`: Arquivo principal que renderiza a aplicação no DOM.

Esta estrutura organiza os componentes reutilizáveis na pasta `components` e as diferentes visualizações da aplicação na pasta `views`. O arquivo `App.js` é o componente raiz que define a estrutura principal da aplicação e o arquivo `index.js` é responsável por renderizar a aplicação no DOM.