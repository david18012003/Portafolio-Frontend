export default function Projects({ data }) {
  if (!data || data.length === 0) {
    return <p>No hay proyectos disponibles en este momento.</p>;
  }

  return (
    <section>
      <h2>Proyectos</h2>
      <ul>
        {data.map((project, index) => (
          <li key={index} style={{ marginBottom: "1.5rem" }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Estado:</strong>{" "}
              {project.Status || "Sin información de estado"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
