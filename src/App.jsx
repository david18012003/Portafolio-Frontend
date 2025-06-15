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
<<<<<<< HEAD
        const response = await axios.get(`${IP}/api/users/listar`);
=======
        const response = await axios.get(`https://portafolio-backend-1.onrender.com/api/users/listar`);
>>>>>>> f781ab1e637a2de18fbec7b5e7ee7e6a49bbb4f4
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
<<<<<<< HEAD
        const response = await axios.get(`${IP}/api/projects/listar/${dataUser.id}`);
=======
        const response = await axios.get(`https://portafolio-backend-1.onrender.com/api/projects/listar/${dataUser.id}`);
>>>>>>> f781ab1e637a2de18fbec7b5e7ee7e6a49bbb4f4
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
