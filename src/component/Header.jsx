export default function Header({ name }) {
  return (
    <header className="header">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGrcm_S5zxSjrZ02xc9Vfdu4kXivX4wGEXFA&s" alt="Rosel" className="profile" />
      <h1>{name || 'Cargando...'}</h1>
      <p>Tester QA | Desarrollador Junior</p>
    </header>
  );
}
