export default function Header({name}) {
    return (
      <header className="header">
        <img src="/profile.jpg" alt="Rosel" className="profile" />
        <h1>{name||'Cargando...'}</h1>
        <p>Tester QA | Desarrollador Junior</p>
      </header>
    )
  }
  