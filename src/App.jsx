import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";

// Componentes
import Header from "./component/Header.jsx";
import About from "./component/About.jsx";
import Experience from "./component/Experience.jsx";
import Projects from "./component/Projects.jsx";
import Contact from "./component/Contact.jsx";
import FloatingChatDraggable from "./component/FloatingChatDraggable.jsx";

// Contexto
import { MyInfoProvider } from "./context/MyInfo.jsx";
import { IP } from "./component/ipConfig.jsx";

function App() {
  const [dataUser, setDataUser] = useState(null);
  const [dataProjects, setDataProjects] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const fetchUser = async (intentos = 0) => {
      try {
        const response = await axios.get(`${IP}/api/users/listar`);
        setDataUser(response.data[0]);
        console.log("Usuario cargado:", response.data[0]);
      } catch (error) {
        console.error("❌ Error al cargar el usuario:", error.message);

        if (intentos < 5) {
          setTimeout(() => fetchUser(intentos + 1), 1000); // vuelve a intentar en 1s
          console.log(`Reintentando cargar el usuario (${intentos + 1}/5)...`);
        }
      }
    };
    fetchUser();
  }, []);

  // Cargar proyectos cuando se obtenga el usuario
  useEffect(() => {
    const fetchProjects = async () => {
      console.log(
        "Datos del usuario: ",
        "telefono: ",
        dataUser.phone,
        "email: ",
        dataUser.email,
        "linkedin: ",
        dataUser.linkedin,
        "github: ",
        dataUser.github
      );

      if (!dataUser?.id) return;

      try {
        const response = await axios.get(
          `${IP}/api/projects/listar/${dataUser.id}`
        );

        setDataProjects(response.data);
      } catch (error) {
        console.error("❌ Error al cargar los proyectos:", error);
      }
    };

    fetchProjects();
  }, [dataUser]);

  return (
    <MyInfoProvider>
      <div>
        <Header name={dataUser?.name || "Cargando..."} />
        <About />
        <Experience />
        {dataProjects && <Projects data={dataProjects} />}

        {dataUser && (
          <Contact
            phone={dataUser.phone}
            email={dataUser.email}
            linkedin={dataUser.linkedin}
            github={dataUser.github}
          />
        )}

        <FloatingChatDraggable />
      </div>
    </MyInfoProvider>
  );
}

export default App;
