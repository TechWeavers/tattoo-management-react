function ListaUsuarios({ usuarios }) {
  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          {usuario.nome} - {usuario.email}
        </li>
      ))}
    </ul>
  );
}
