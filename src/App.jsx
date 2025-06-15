import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Componentes
import Header from './component/Header.jsx';
import About from './component/About.jsx';
import Experience from './component/Experience.jsx';
import Projects from './component/Projects.jsx';
import Contact from './component/Contact.jsx';
import FloatingChatDraggable from './component/FloatingChatDraggable.jsx';

// Contexto
import { MyInfoProvider } from './context/MyInfo.jsx';


function App() {
  const [dataUser, setDataUser] = useState(null);
  const [dataProjects, setDataProjects] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://portafolio-backend-1.onrender.com/api/users/listar`);
        setDataUser(response.data[0]);
      } catch (error) {
        console.error('❌ Error al cargar el usuario:', error);
      }
    };

    fetchUser();
  }, []);

  // Cargar proyectos cuando se obtenga el usuario
  useEffect(() => {
    const fetchProjects = async () => {
      if (!dataUser?.id) return;

      try {
        const response = await axios.get(`https://portafolio-backend-1.onrender.com/api/projects/listar/${dataUser.id}`);
        setDataProjects(response.data);
      } catch (error) {
        console.error('❌ Error al cargar los proyectos:', error);
      }
    };

    fetchProjects();
  }, [dataUser]);

  return (
    <MyInfoProvider>
      <div>
        <Header name={dataUser?.name || 'Cargando...'} />
        <About />
        <Experience />
        <Projects data={dataProjects} />
        <Contact
          phone={dataUser?.phone || 'Cargando...'}
          email={dataUser?.email || 'Cargando...'}
          linkedin={dataUser?.linkedin || 'Cargando...'}
        />
        <FloatingChatDraggable />
      </div>
    </MyInfoProvider>
  );
}

export default App;
