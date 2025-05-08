export default function Projects({ data }) {
    if (!data) return <p>Cargando proyectos...</p>;
    console.log("Proyectos: de data ", data[0].Status); // Verifica que los datos se estén pasando correctamente
    
  
    return (
      <section>
        <h2>Proyectos</h2>
        <ul>
          {data.map((project, index) => (
            <li key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Estado:</strong> {project.Status}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  